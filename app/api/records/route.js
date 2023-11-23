import dbConnect from "@/libs/db";
import {NextResponse} from "next/server";
import Record from "@/models/records";
import Log from "@/models/logs";
import Question from "@/models/questions";

export async function POST(req) {
  try {
    const data = await req.json(); // Assuming you're sending data in the request body

    // Insert the data into the database
    await dbConnect();
    const doubleSCN = await Record.findOne({'SCN: ': data['SCN: ']});
    
    //Chck if SCN has duplicates in the data. 
    if(doubleSCN) {
      return NextResponse.json({message: 'SCN should be unique'}, {status: 500});
    }

    //set isdeleted and expirationDate to record
    data.isdeleted = false
    const createdBy = data.createdBy;
    delete data.createdBy;    
    data.expirationDate = new Date('9999-12-31T23:59:59.999Z');

    //create record
    await Record.create(data);

    const createdData = await Record.findOne({'SCN: ': data['SCN: ']});
    const id = createdData._id;
    
    const log = {
      recordId: id,
      edits: [{
        editedBy: createdBy,
        action: 'created',
        timestamp: Date.now()
      }],
      isdeleted: false
    }

    // DONT DELETE THIS CONSOLE LOG
    console.log("CREATED \n", log);
    await Log.create(log);
    return NextResponse.json({message: "Record created successfully"}, {status: 201});
  } catch (error) {
    return NextResponse.json({message: error.message}, {status: 500});
  }
};

export async function GET(req) {
  try {
    const url = new URL(req.url);
    // If searchParam has an ID the code segment bellow is for getting individual records.
    // Else, the code segment bellow is for getting all records
    if(url.searchParams.get('id')){
      const id = url.searchParams.get('id')

      await dbConnect();
      let record = await Record.findOne({_id: id});
      const log = await Log.findOne({recordId: id});
      const samp_q = await Question.findOne({});
      //version in the form
      const F_version = samp_q.version;
      //version in the record
      const R_version = record['First Name: '].version;

      if (F_version == R_version){
        return NextResponse.json({record, log}, {status: 200});
      }
      
      const formQuestions = await Question.find({});
      console.log("sopas")
      const new_record = {};

      formQuestions.map((item) => {
        // check if same questions
        if(Object.keys(record).includes(item.question)){
          //check if same type
          if (record[item.question].type == item.inputType){
            if (record[item.question].type == 'radio' || record[item.question].type == 'checkbox'){
              //check if options are the same
              console.log(item.choices)
              console.log(record[item.question].options)
              if (JSON.stringify(record[item.question].options) === JSON.stringify(item.choices)){
                //main checks did not change
                new_record[item.question] = record[item.question]
                new_record[item.question].order = item.number
              }else{
                new_record[item.question] = record[item.question]
                new_record[item.question].choices = item.choices
              }
            } else {
              new_record[item.question] = record[item.question]
              new_record[item.question].order = item.number
            }
          } else {
            // handle change type 
            const newQuestion = {value: '', required: item.required, type: item.inputType, order: item.number}
            if (item.inputType == 'radio' || item.inputType == 'checkbox'){
              newQuestion['options'] = item.choices;
            }
            new_record[item.question] = newQuestion;
          }
        } else {
           // create new 
           const newQuestion = {value: '', required: item.required, type: item.inputType, order: item.number}
           if (item.inputType == 'radio' || item.inputType == 'checkbox'){
            newQuestion['options'] = item.choices;
           }
           new_record[item.question] = newQuestion;
        } 
      });
      new_record['_id'] = id;
      new_record['isdeleted'] = record.isdeleted;
      new_record['expirationDate'] = record.expirationDate;
      record = new_record;
      
      return NextResponse.json({record, log}, {status: 200});
    } else {
      const page = url.searchParams.get('page') ?? '1';
      const per_page = '8';

      const start = (Number(page) - 1) * Number(per_page);
      const end = start + Number(per_page);

      await dbConnect();
      const records = await Record.find({}).skip(start).limit(end);
      const limit = await Record.countDocuments();
      
      return NextResponse.json({records, limit, per_page}, {status: 200});
    }
  } catch (error) {
    return NextResponse.json({message: error.message}, {status: 500});
  }
}

export async function PATCH(req){
  try {
    const url = new URL(req.url);
    await dbConnect();
    //data is the request body sent.
    const data = await req.json()
    const id = url.searchParams.get('id')

    //If id exist update individual record
    if(id){
      //check if SCN has a duplicate in the DB
      if(data['SCN: ']){
        const doubleSCN = await Record.findOne({'SCN: ': {value: data['SCN: '].value, required: data['SCN: '].required, type: data['SCN: '].type}})
        if(doubleSCN) {
          return NextResponse.json({message: 'SCN should be unique'}, {status: 500});
        }
      }

      //if ssearchParams has recover, the record is recovered and unmarked as deleted. 
      if(url.searchParams.get('recover')) {
        const removeExpire = await Record.updateOne({ _id: id }, { $set: { expirationDate: new Date('9999-12-31T23:59:59.999Z') }})
      }
      //if the data has an expirationDate in the JSON body reset the expirationDate into a date object. 
      if (data.expirationDate){
        data.expirationDate = new Date(data.expirationDate)
      } 
      
      const record = await Record.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
      });

      const log = await Log.findOneAndUpdate({recordId: id}, { $set: { isdeleted: data.isdeleted } }, {new:true});

      await record.save();
      await log.save();

      if (!record || !log) {
        return NextResponse.json({message: "record not found"}, {status: 400});
      }
      return NextResponse.json({record}, {status: 200});
    } else {
      //Recover all records
      if(url.searchParams.get('recover')) {
        
        const record = await Record.updateMany({ isdeleted: true }, { 
          $set: { 
              expirationDate: new Date('9999-12-31T23:59:59.999Z'),
              isdeleted: false
          }
        })
        return NextResponse.json({record}, {status: 200});
      }
    }
  } catch (error) {
    return NextResponse.json({message: error.message}, {status: 400});
  }
}

export async function DELETE(req){
  try {    
    const {id} = await req.json();

    await dbConnect();

    console.log("DELETE ID", id);

    if(id && id != 'ALL'){
      console.log("DELETE ID", id);
      const record = await Record.findByIdAndDelete(id);
      const log = await Log.findOneAndDelete({recordId: id});

      if (!record || !log) {
        return NextResponse.json({message: "record not found"}, {status: 400});
      }

      return NextResponse.json({message: "record deleted successfully"}, {status: 200});
    }
      
    const records = await Record.find({isdeleted: true}).deleteMany({});
    const logs = await Log.find({isdeleted: true}).deleteMany({});
    
    if (!records || !logs) {
      return NextResponse.json({message: "All records are not deleted"}, {status: 400});
    }
    return NextResponse.json({message: "All records deleted"}, {status: 200});
  } catch (error) {
    return NextResponse.json({message: error.message}, {status: 500});
  }
}
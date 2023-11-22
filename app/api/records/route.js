import dbConnect from "@/libs/db";
import {NextResponse} from "next/server";
import Record from "@/models/records";
import Log from "@/models/logs";

export async function POST(req) {
  try {
    const data = await req.json(); // Assuming you're sending data in the request body

    // Insert the data into the database
    await dbConnect();
    const doubleSCN = await Record.findOne({'SCN: ': data['SCN: ']})
    
    //Chck if SCN has duplicates in the data. 
    if(doubleSCN) {
      return NextResponse.json({message: 'SCN should be unique'}, {status: 500});
    }
    //set isdeleted and expirationDate to record
    data.isdeleted = false
    const createdBy = data.createdBy;
    delete data.createdBy;
    console.log("CREATED \n", data);    
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
      }]
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
      const record = await Record.findOne({_id: id})
      
      return NextResponse.json({record}, {status: 200});
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

      await record.save();

      if (!record) {
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
    
    console.log("ID", id);
    if(id){
      const record = await Record.findByIdAndDelete(id);

      if (!record) {
        return NextResponse.json({message: "record not found"}, {status: 400});
      }

      return NextResponse.json({message: "record deleted successfully"}, {status: 200});
    }
      
    const records = await Record.find({isdeleted: true}).deleteMany({});

    if (!records) {
      return NextResponse.json({message: "All records are not deleted"}, {status: 400});
    }
    return NextResponse.json({message: "All records deleted"}, {status: 200});
  } catch (error) {
    return NextResponse.json({message: error.message}, {status: 500});
  }
}
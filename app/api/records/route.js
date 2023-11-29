import dbConnect from "@/libs/db";
import {NextResponse} from "next/server";
import Record from "@/models/records";
import Log from "@/models/logs";
import Question from "@/models/questions";

/**
 * API route for creating a record.
 * @param {Object} req 
 * @return {NextResponse} - Response containing:
 *                        - {String} message - Response message. 
 *                        - {Number} status - The appropriate status code.
 * @throws {Error} - the error thrown while trying to create the record.
 */
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

    
    await Log.create(log);
    return NextResponse.json({message: "Record created successfully"}, {status: 201});
  } catch (error) {
    return NextResponse.json({message: error.message}, {status: 500});
  }
};

/**
  * API route for getting all records.
 * @param {Object} req - HTTP request object.
 * @return {NextResponse} - Response containing:
 *                        - {Record[]} records - The list records in a NextResponse.
 *                        - {Number} limit - The total number of records in a NextResponse.
 *                        - {Number} per_page- The number of records per page in a NextResponse.
 *                        - {String} message - Response message. 
 *                        - {Number} status - The appropriate status code.
 * @throws {Error} - the error thrown while trying to get the records.
 */
export async function GET(req) {
  try {
    const url = new URL(req.url);
    // If searchParam has an ID the code segment bellow is for getting individual records.
    // Else, the code segment bellow is for getting all records
    if(url.searchParams.get('id')){
      // Get the id from the request url
      const id = url.searchParams.get('id')

      await dbConnect();
      // Find the record by id
      let record = await Record.findOne({_id: id});
      // Find the log by id
      const log = await Log.findOne({recordId: id});
      // Find the question by id
      const samp_q = await Question.findOne({});
      //version in the form
      const F_version = samp_q.version;
      //version in the record
      const R_version = record['First Name: '].version;

      // if the version in the form and the version in the record is the same return the record and log
      if (F_version == R_version){
        return NextResponse.json({record, log}, {status: 200});
      }
      // if the version in the form and the version in the record is not the same update the record and log
      const formQuestions = await Question.find({});
      // create new record
      const new_record = {};
      // loop through the questions in the form
      formQuestions.map((item) => {
        // check if same questions
        if(Object.keys(record).includes(item.question)){
          //check if same type
          if (record[item.question].type == item.inputType){
            if (record[item.question].type == 'radio' || record[item.question].type == 'checkbox'){
              //check if options are the same
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
              if (new_record[item.question].type == 'text')
              console.log("IN DB", new_record[item.question])
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
      // add the other fields in the record
      new_record['_id'] = id;
      new_record['isdeleted'] = record.isdeleted;
      new_record['expirationDate'] = record.expirationDate;
      // update the record
      record = new_record;
      // return the record and log
      return NextResponse.json({record, log}, {status: 200});
    } else {
      // Get the page number from the request url
      const page = url.searchParams.get('page') ?? '1';
      const per_page = '8';

      // Calculate the start and end index of the records to be returned
      const start = (Number(page) - 1) * Number(per_page);
      const end = start + Number(per_page);

      await dbConnect();
      // Extract search parameters from the URL
      const records = await Record.find({}).skip(start).limit(end);
      const limit = await Record.countDocuments();
      
      // Return the records, number of records, and number of records per page
      return NextResponse.json({records, limit, per_page}, {status: 200});
    }
  } catch (error) {
    // Return the error message
    return NextResponse.json({message: error.message}, {status: 500});
  }
}

/**
 * API route for updating a record.
 * @param {Object} req - HTTP request object.
 * @return {NextResponse} - Response containing:
 *                        - {Record} record - Record data of the user.
 *                        - {String} message - Response message. 
 *                        - {Number} status - The appropriate status code.
 * @returns {string} - the message indicating whether the record is updated.
 * @throws {Error} - the error thrown while trying to update the record.
 */
export async function PATCH(req){
  try {
    const url = new URL(req.url);
    await dbConnect();
    //data is the request body sent.
    const data = await req.json()
    const id = url.searchParams.get('id');

    //If id exist update individual record
    if(id){
      //check if SCN has a duplicate in the DB
      if(data['SCN: ']){
        const doubleSCN = await Record.findOne({'SCN: ': data['SCN: ']});
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
      
      // Update the record
      const record = await Record.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
      });

      // Update the log
      const log = await Log.findOneAndUpdate({recordId: id}, { $set: { isdeleted: data.isdeleted } }, {new:true});

      // If the record or log is not found, return an error message
      await record.save();
      await log.save();

      // Return the failed message if the record or log is not found
      if (!record || !log) {
        return NextResponse.json({message: "record not found"}, {status: 400});
      }
      // Return the success message if the record or log is updated
      return NextResponse.json({record}, {status: 200});
    } else {
      //Recover all records
      if(url.searchParams.get('recover')) {
        
        // Update the record
        const record = await Record.updateMany({ isdeleted: true }, { 
          $set: { 
              expirationDate: new Date('9999-12-31T23:59:59.999Z'),
              isdeleted: false
          }
        })
        // Update the log
        return NextResponse.json({record}, {status: 200});
      }
    }
  } catch (error) {
    // Return the error message
    return NextResponse.json({message: error.message}, {status: 400});
  }
}

/**
 * API route for deleting a record.
 * @param {Object} req - HTTP request object.
 * @return {NextResponse} - Response containing:
 *                        - {String} message - Response message. 
 *                        - {Number} status - The appropriate status code.
 * @returns {string} - the message indicating whether the record is deleted.
 * @throws {Error} - the error thrown while trying to delete the record.
 */
export async function DELETE(req){
  try {    
    // Get the id from the request url
    const {id} = await req.json();

    await dbConnect();

    // If id exist delete individual record
    if(id && id != 'ALL'){
      const record = await Record.findByIdAndDelete(id);
      const log = await Log.findOneAndDelete({recordId: id});

      // If the record or log is not found, return an error message
      if (!record || !log) {
        return NextResponse.json({message: "record not found"}, {status: 400});
      }

      // Return the success message if the record or log is deleted
      return NextResponse.json({message: "record deleted successfully"}, {status: 200});
    }
      
    // Delete all records
    const records = await Record.find({isdeleted: true}).deleteMany({});
    // Delete all logs
    const logs = await Log.find({isdeleted: true}).deleteMany({});
    
    // If the records or logs are not found, return an error message
    if (!records || !logs) {
      return NextResponse.json({message: "All records are not deleted"}, {status: 400});
    }
    // Return the success message if the records or logs are deleted
    return NextResponse.json({message: "All records deleted"}, {status: 200});
  } catch (error) {
    // Return the error message
    return NextResponse.json({message: error.message}, {status: 500});
  }
}
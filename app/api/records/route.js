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
    const doubleSN = await Record.findOne({'SN: ': data['SN: ']})

    if(doubleSCN) {
      return NextResponse.json({message: 'SCN should be unique'}, {status: 500});
    } else if (doubleSN) {
      return NextResponse.json({message: 'SN should be unique'}, {status: 500});
    }

    data.isdeleted = false
    const createdBy = data.createdBy;
    delete data.createdBy;

    await Record.create(data);

    const createdData = await Record.findOne({'SCN: ': data['SCN: ']});
    const id = createdData._id;
    
    const log = {
      recordId: id,
      action: 'created',
      editedBy: createdBy,
      timestamp: Date.now()
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
  console.log('IN GET');
  try {
    const url = new URL(req.url);
    console.log('IN GET', url);
    if(url.searchParams.get('id')){
      const id = url.searchParams.get('id')

      await dbConnect();
      const record = await Record.findOne({_id: id})
      console.log("IN DB", record);
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
    const data = await req.json()
    const id = url.searchParams.get('id')
    console.log("id: ", id)
    
    if(id){
      if(data['SCN: ']){
        const doubleSCN = await Record.findOne({'SCN: ': {value: data['SCN: '].value, required: data['SCN: '].required, type: data['SCN: '].type}})
        if(doubleSCN) {
          return NextResponse.json({message: 'SCN should be unique'}, {status: 500});
        }
      } else if (data['SN: ']){
        const doubleSN = await Record.findOne({'SN: ': {value: data['SN: '].value, required: data['SN: '].required, type: data['SN: '].type}})
        if(doubleSN) {
          return NextResponse.json({message: 'SN should be unique'}, {status: 500});
        }
      }

      console.log("id: ", url.searchParams.get('id'))
      console.log("data: ", data)
      

      if(url.searchParams.get('recover')) {
        const removeExpire = await Record.updateOne({ _id: id }, { $unset: { expireAfterSeconds: 1 }})
      }
      const record = await Record.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
      });

      if (!record) {
        return NextResponse.json({message: "record not found"}, {status: 400});
      }
      return NextResponse.json({record}, {status: 200});
    } else {
      if(url.searchParams.get('recover')) {
        // const recoverRecords = await Record.find({isdeleted: true})
        //   recoverRecords.map(async (record)=>{
        //     record.isdeleted = false
        //     record.expireAfterSeconds = undefined
        //     await record.save()
        //   })
        await Record.updateMany({ isdeleted: true }, { $unset: { expireAfterSeconds: 1 }})
        const record = await Record.updateMany({ isdeleted: true }, data)
        return NextResponse.json({record}, {status: 200});
      }
    }
  } catch (error) {
    return NextResponse.json({message: error.message}, {status: 400});
  }
}

export async function DELETE(req){
  try {
    // console.log(req);
    // const {username} = await req.json();
    // await dbConnect();

    // const user = await User.findOneAndDelete({username: username});

    // if(!user){
    //     return NextResponse.json({message: "User not deleted"}, {status: 404});
    // }
    // return NextResponse.json({message: "User deleted successfully"}, {status: 200});
    
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
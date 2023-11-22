import dbConnect from "@/libs/db";
import {NextResponse} from "next/server";
import Log from "@/models/logs";

export async function GET(req) {
    try {
        const url = new URL(req.url);
        const id = url.searchParams.get('id');
        const page = url.searchParams.get('page') ?? '1';
        await dbConnect();
    } catch (error) {
        return NextResponse.json({message: error.message}, {status: 500});
    }
}

export async function PATCH(req){
    try {
      const url = new URL(req.url);
      
      //data is the request body sent.
      const data = await req.json();
      const id = url.searchParams.get('id');

      console.log("DATA IN DB", data);
      console.log(id);
  
        await dbConnect();
        const updateLog = await Log.findOneAndUpdate(
            { recordId: id },
            { $push: { edits: data } },
            { new: true }
        );

        await updateLog.save();

        console.log("UPDATE LOG", updateLog);

        if (!updateLog) {
            return NextResponse.json({ message: "Log not found" }, { status: 404 });
        }
        return NextResponse.json({ updateLog }, { status: 200 });
      
    } catch (error) {
        console.log(error);
      return NextResponse.json({message: error.message}, {status: 400});
    }
}
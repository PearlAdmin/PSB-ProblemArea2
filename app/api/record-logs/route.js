import dbConnect from "@/libs/db";
import {NextResponse} from "next/server";
import Log from "@/models/logs";

/**
 * API route for updating a log.
 * @api
 * @param {Object} req - HTTP request object.
 * @returns {string} - the log updated.
 * @throws {Error} - the error thrown while trying to update the log.
 */
export async function PATCH(req){
    try {
      const url = new URL(req.url);
      
      //data is the request body sent.
      const data = await req.json();
      const id = url.searchParams.get('id');
  
        await dbConnect();
        const updateLog = await Log.findOneAndUpdate(
            { recordId: id },
            { $push: { edits: data } },
            { new: true }
        );

        await updateLog.save();

        if (!updateLog) {
            return NextResponse.json({ message: "Log not found" }, { status: 404 });
        }
        return NextResponse.json({ updateLog }, { status: 200 });
      
    } catch (error) {
        console.log(error);
      return NextResponse.json({message: error.message}, {status: 400});
    }
}
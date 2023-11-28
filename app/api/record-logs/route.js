import dbConnect from "@/libs/db";
import {NextResponse} from "next/server";
import Log from "@/models/logs";

/**
 * API route for updating a log.
 * @api
 * @param {Object} req - HTTP request object.
 * @return {NextResponse} - Response containing:
 *                        - {string} updateLog - the log updated.
 *                        - {String} message - Response message. 
 *                        - {Number} status - The appropriate status code.
 * @throws {Error} - the error thrown while trying to update the log.
 */
export async function PATCH(req){
    try {
      // Get the id from the request url
      const url = new URL(req.url);
      
      //data is the request body sent.
      const data = await req.json();
      const id = url.searchParams.get('id');
  
        await dbConnect();
        // Find the log by id
        const updateLog = await Log.findOneAndUpdate(
            { recordId: id },
            { $push: { edits: data } },
            { new: true }
        );

        // Save the log
        await updateLog.save();

        // Return failed message if the log is not updated
        if (!updateLog) {
            return NextResponse.json({ message: "Log not found" }, { status: 404 });
        }
        // Return success message if the log is updated
        return NextResponse.json({ updateLog }, { status: 200 });
      
    } catch (error) {
      // Return error message if there is an error
      return NextResponse.json({message: error.message}, {status: 400});
    }
}
import dbConnect from "@/libs/db";
import {NextResponse} from "next/server";
import mongoose from "mongoose";

export async function POST(req) {
  try {
    const data = await req.json(); // Assuming you're sending data in the request body
    console.log(data);
    // Create a model for the data, but it's not required to have a schema
    const Record = mongoose.models.Record || mongoose.model('Record', {}, 'records');

    // Insert the data into the database
    await dbConnect();
    await Record.create(data);

    return NextResponse.json({message: "Record created successfully"}, {status: 201});
  } catch (error) {
    return NextResponse.json({message: error.message}, {status: 500});
  }
};
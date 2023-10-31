import dbConnect from "@/libs/db";
import {NextResponse} from "next/server";
import mongoose from "mongoose";

export default async (req, res) => {
  try {
    const { data } = await req.json(); // Assuming you're sending data in the request body

    // Create a model for the data, but it's not required to have a schema
    const Record = mongoose.models.Record || mongoose.model('Record', {}, 'records');

    // Insert the data into the database
    await Record.create(data);

    return NextResponse.json({message: "Question created successfully"}, {status: 201});
  } catch (error) {
    return NextResponse.json({message: error.message}, {status: 500});
  }
};
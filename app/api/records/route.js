import dbConnect from "@/libs/db";
import {NextResponse} from "next/server";
import Record from "@/models/records";

export async function POST(req) {
  try {
    const data = await req.json(); // Assuming you're sending data in the request body

    // Insert the data into the database
    await dbConnect();
    await Record.create(data);

    return NextResponse.json({message: "Record created successfully"}, {status: 201});
  } catch (error) {
    return NextResponse.json({message: error.message}, {status: 500});
  }
};

export async function GET() {
  try {
    await dbConnect();
    const records = await Record.find({});

    return NextResponse.json({records}, {status: 200});
  } catch (error) {
    return NextResponse.json({message: error.message}, {status: 500});
  }
}
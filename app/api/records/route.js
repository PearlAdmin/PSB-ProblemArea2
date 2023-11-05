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

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const page = url.searchParams.get('page') ?? '1';
    const per_page = '8';

    const start = (Number(page) - 1) * Number(per_page);
    const end = start + Number(per_page);

    await dbConnect();
    const records = await Record.find({}).skip(start).limit(end);
    const limit = await Record.countDocuments();

    return NextResponse.json({records, limit, per_page}, {status: 200});
  } catch (error) {
    return NextResponse.json({message: error.message}, {status: 500});
  }
}
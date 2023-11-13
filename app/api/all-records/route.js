import dbConnect from "@/libs/db";
import {NextResponse} from "next/server";
import Record from "@/models/records";

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const page = url.searchParams.get('page') ?? '1';
    const per_page = '5';

    const start = (Number(page) - 1) * Number(per_page);
    const end = Number(per_page);

    await dbConnect();
    // const records = await Record.find({}).skip(start).limit(end);

    const searchText= url.searchParams.get('searchText') || "";
    const searchValue = url.searchParams.get('searchValue') || "";
    const selectedValue = url.searchParams.get('selectedValue') || "";

    let records = "";

    // Check if searchText is present
    if (searchText) {
      records = await Record.find({ [`${searchValue}.value`]: { $regex: new RegExp(searchText, 'i') } })
        .sort({ [selectedValue + " "]: 1 }) // 1 for ascending order, -1 for descending order 
        .skip(start)
        .limit(end);
    } else {
      records = await Record.find()
        .sort({ [selectedValue + " "]: 1 }) // 1 for ascending order, -1 for descending order 
        .skip(start)
        .limit(end);
    }

    const limit = await Record.countDocuments();
    return NextResponse.json({records, limit, per_page}, {status: 200});
  } catch (error) {
    return NextResponse.json({message: error.message}, {status: 500});
  }
}
import dbConnect from "@/libs/db";
import {NextResponse} from "next/server";
import Record from "@/models/records";

/**
 * API route for getting all records.
 * @api
 * @param {Object} req - HTTP request object.
 * @returns {Record} - the list records.
 * @returns {Number} - the total number of records.
 * @returns {Number} - the number of records per page.
 * @throws {Error} - the error thrown while trying to get the records.
 */
export async function GET(req) {
  try {
    const url = new URL(req.url);
    const page = url.searchParams.get('page') ?? '1';
    const per_page = '8';

    const start = (Number(page) - 1) * Number(per_page);
    const end = Number(per_page);

    await dbConnect();

    const searchText= url.searchParams.get('searchText') || "";
    const searchValue = url.searchParams.get('searchValue') || "";
    const selectedValue = url.searchParams.get('selectedValue') || "";
    let isdeleted = false;
    if (url.searchParams.get('deleted')) isdeleted = true;

    let records = "";

    // Check if searchText is present
    if (searchText) {
      records = await Record.find({ [`${searchValue}.value`]: { $regex: new RegExp(searchText, 'i')}, isdeleted : isdeleted })
        .collation({ locale: 'en', strength: 2 }) // 'en' for English, strength 2 for case-insensitive
        .sort({ [selectedValue + " "]: 1 }) // 1 for ascending order, -1 for descending order 
        .skip(start)
        .limit(end);
    } else {
      if (selectedValue == "Assigned Date:"){
        records = await Record.find({isdeleted : isdeleted})
        .collation({ locale: 'en', strength: 2 }) // 'en' for English, strength 2 for case-insensitive
        .sort({ [selectedValue + " "]: -1 }) // 1 for ascending order, -1 for descending order 
        .skip(start)
        .limit(end);
      }else{
        records = await Record.find({isdeleted : isdeleted})
        .collation({ locale: 'en', strength: 2 }) // 'en' for English, strength 2 for case-insensitive
        .sort({ [selectedValue + " "]: 1 }) // 1 for ascending order, -1 for descending order 
        .skip(start)
        .limit(end);
      }
    }
    
    let limit;
    if (searchText){
      limit = await Record.find({ [`${searchValue}.value`]: { $regex: new RegExp(searchText, 'i')}, isdeleted : isdeleted }).countDocuments();
    } else {
      limit = await Record.find({isdeleted : isdeleted}).countDocuments();
    }
    
    return NextResponse.json({records, limit, per_page}, {status: 200});
  } catch (error) {
    return NextResponse.json({message: error.message}, {status: 500});
  }
}
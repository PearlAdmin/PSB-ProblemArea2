import dbConnect from "@/libs/db";
import {NextResponse} from "next/server";
import Record from "@/models/records";

/**
 * API route for getting all records.
 * @api
 * @param {Object} req - HTTP request object.
 * @return {NextResponse} - response containing the following elements:
 *                        - {Record[]} records - The list records in a NextResponse.
 *                        - {Number} limit - The total number of records in a NextResponse.
 *                        - {Number} per_page- The number of records per page in a NextResponse.
 * @throws {Error} - The error thrown while trying to get the records.
 */
export async function GET(req) {
  try {
     // Extract query parameters from the request URL
    const url = new URL(req.url);
    const page = url.searchParams.get('page') ?? '1';
    const per_page = '8';

    // Calculate the start and end values for pagination
    const start = (Number(page) - 1) * Number(per_page);
    const end = Number(per_page);

    // Connect to the database
    await dbConnect();

    // Extract search parameters from the URL
    const searchText= url.searchParams.get('searchText') || "";
    const searchValue = url.searchParams.get('searchValue') || "";
    const selectedValue = url.searchParams.get('selectedValue') || "";
    
    // Determine if records are marked as deleted and set isDeleted based on param
    let isdeleted = false;
    if (url.searchParams.get('deleted')) isdeleted = true;
    
    // Initialize variable for storing records
    let records = "";

    // Check if records are marked as deleted
    if (isdeleted){
       // Handle sorting and filtering for deleted records
      if (searchText) {
        if (selectedValue == "Assigned Date: "){
          records = await Record.find({ [`${searchValue}.value`]: { $regex: new RegExp(searchText, 'i')}, isdeleted : isdeleted })
            .collation({ locale: 'en', strength: 2 }) // 'en' for English, strength 2 for case-insensitive
            .sort({ [selectedValue]: -1 }) // 1 for ascending order, -1 for descending order 
            .skip(start)
            .limit(end);
        }
        else{
          records = await Record.find({ [`${searchValue}.value`]: { $regex: new RegExp(searchText, 'i')}, isdeleted : isdeleted })
            .collation({ locale: 'en', strength: 2 }) // 'en' for English, strength 2 for case-insensitive
            .sort({ [selectedValue]: 1 }) // 1 for ascending order, -1 for descending order 
            .skip(start)
            .limit(end);
        }
      } else {
        
        if (selectedValue == "Assigned Date: "){
          records = await Record.find({isdeleted : isdeleted})
          .collation({ locale: 'en', strength: 2 }) // 'en' for English, strength 2 for case-insensitive
          .sort({ [selectedValue]: -1 }) // 1 for ascending order, -1 for descending order 
          .skip(start)
          .limit(end);
        }else{
          records = await Record.find({isdeleted : isdeleted})
          .collation({ locale: 'en', strength: 2 }) // 'en' for English, strength 2 for case-insensitive
          .sort({ [selectedValue]: 1 }) // 1 for ascending order, -1 for descending order 
          .skip(start)
          .limit(end)
        }
      }
    }else{
      // Handle sorting and filtering for non-deleted records
      if (searchText) {
        if (selectedValue == "Assigned Date:"){
          records = await Record.find({ [`${searchValue}.value`]: { $regex: new RegExp(searchText, 'i')}, isdeleted : isdeleted })
            .collation({ locale: 'en', strength: 2 }) // 'en' for English, strength 2 for case-insensitive
            .sort({ [selectedValue+" "]: -1 }) // 1 for ascending order, -1 for descending order 
            .skip(start)
            .limit(end);
        }
        else{
          records = await Record.find({ [`${searchValue}.value`]: { $regex: new RegExp(searchText, 'i')}, isdeleted : isdeleted })
            .collation({ locale: 'en', strength: 2 }) // 'en' for English, strength 2 for case-insensitive
            .sort({ [selectedValue+" "]: 1 }) // 1 for ascending order, -1 for descending order 
            .skip(start)
            .limit(end);
        }
      } else {
        if (selectedValue == "Assigned Date:"){
          records = await Record.find({isdeleted : isdeleted})
          .collation({ locale: 'en', strength: 2 }) // 'en' for English, strength 2 for case-insensitive
          .sort({ [selectedValue+" "]: -1 }) // 1 for ascending order, -1 for descending order 
          .skip(start)
          .limit(end);
        }else{
          records = await Record.find({isdeleted : isdeleted})
          .collation({ locale: 'en', strength: 2 }) // 'en' for English, strength 2 for case-insensitive
          .sort({ [selectedValue+" "]: 1 }) // 1 for ascending order, -1 for descending order 
          .skip(start)
          .limit(end)
        }
      }
    }
    
    // Calculate the total number of records
    let limit;
    if (searchText){
      limit = await Record.find({ [`${searchValue}.value`]: { $regex: new RegExp(searchText, 'i')}, isdeleted : isdeleted }).countDocuments();
    } else {
      limit = await Record.find({isdeleted : isdeleted}).countDocuments();
    }

    // Return the records and related information in the response
    return NextResponse.json({records, limit, per_page}, {status: 200});
  } catch (error) {
     // Handle errors and return an error response
    return NextResponse.json({message: error.message}, {status: 500});
  }
}
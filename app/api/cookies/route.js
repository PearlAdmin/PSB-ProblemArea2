import dbConnect from "@/libs/db";
import User from "@/models/users";
import { NextResponse } from "next/server";

/**
 * API route for user-cookie checking.
 * @api
 * @param {Object} req - HTTP request object.
 * @returns {NextResponse} - Response containing:
 *                         - {String} message - A message providing information about the user check.
 *                         - {Number} status - The appropriate status code.
 * @throws {Error} - the error thrown while trying to get the user.
 */
export async function POST(req){

    // Parse the JSON data from the request object
    const data = await req.json();

    //Connect to database
    await dbConnect();

    //find user by username and store in user constant
    const user = await User.findOne({username: data.username});

    // If the user is not found, return a 404 response with not found message
    if(!user){
        return NextResponse.json(
            {message: "Username not found"},
            {status: 404},
        );
    }
     // Check if the role in the request matches the user's role
    if(data.role !== user.role){
        return NextResponse.json(
            {message: "You do not have access to that!"},
            {status: 404},
        )
    }
     // Return a success response if the user is found and roles match
    return NextResponse.json(
        {message: "Username found"},
        {status: 200}
    );
}
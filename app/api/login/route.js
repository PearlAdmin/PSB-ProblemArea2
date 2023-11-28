import dbConnect from "@/libs/db";
import User from "@/models/users";
import { NextResponse } from "next/server";

/**
 * API route for user login validation
 * @api
 * @param {Object} req - HTTP request object.
 * @return {NextResponse} - Response containing:
 *                         - {String} message - Response message.
 *                         - {Number} status - The appropriate status code.
 *                         - {Object} user - object contianing the username and role of the user.
 * @throws {Error} - the error thrown while trying to get the user.
 */
export async function POST(req){
    // Parse the JSON data from the request object
    try {
        const data = await req.json();
    
        // Connect to database
        await dbConnect();

        // Find user by username and store in user constant
        const user = await User.findOne({username: data.username});
        
        // If the user is not found, return a 404 response
        if(!user){
            // Return the response
            return NextResponse.json({message: "Username not found"}, {status: 404});
        }

        // Check if the password matches
        const isPasswordMatch = await user.comparePassword(data.password);

        // If the password does not match, return a 401 response
        if(!isPasswordMatch){
            // Return the response
            return NextResponse.json({message: "Incorrect password!"}, {status: 401});
        }

        // Response with a 200 status code and the user's username and role
        return NextResponse.json({
            message: "Login Successfully!",
            user: {
                username: user.username,
                role: user.role,
            },
        }, { status: 200 });
    } catch (error) {
        // Return the error
        return NextResponse.json({message: error.message}, {status: 500}); 
    }
}
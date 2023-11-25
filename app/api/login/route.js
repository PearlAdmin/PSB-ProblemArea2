import dbConnect from "@/libs/db";
import User from "@/models/users";
import { NextResponse } from "next/server";

/**
 * API route for user login validation
 * @api
 * @param {Object} req - HTTP request object.
 * @returns {string} - the message indicating whether the user is found.
 * @returns {Object} - object contianing the username and role of the user.
 * @throws {Error} - the error thrown while trying to get the user.
 */
export async function POST(req){
    const data = await req.json();
    
    await dbConnect();
    const user = await User.findOne({username: data.username});
    
    if(!user){
        return NextResponse.json({message: "Username not found"}, {status: 404});
    }

    const isPasswordMatch = await user.comparePassword(data.password);

    if(!isPasswordMatch){
        return NextResponse.json({message: "Incorrect password!"}, {status: 401});
    }

    
    return NextResponse.json({
        message: "Login Successfully!",
        user: {
            username: user.username,
            role: user.role,
        },
    }, { status: 200 });
}
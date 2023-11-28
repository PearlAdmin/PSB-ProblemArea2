import dbConnect from "@/libs/db";
import User from "@/models/users";
import { NextResponse } from "next/server";

/**
 * API route for creating authorized users.
 * @api
 * @param {Object} req - HTTP request object.
 * @return {NextResponse} - Response containing:
 *                         - {String} message - A message providing information about the user check.
 *                         - {Number} status - The appropriate status code.
 * @throws {Error} - the error thrown while trying to get the user.
 */
export async function POST(req){
    const {username, password} = await req.json();

    await dbConnect();
    await User.create({username, password});

    return NextResponse.json({message: "User created successfully"}, {status: 201});
}

/**
 * API route for getting all user.
 * @api
 * @param {Object} req - HTTP request object.
 * @return {NextResponse} - Response containing:
 *                        - {String} message - Response message.
 *                        - {User} users - the list of users
 *                        - {Number} limit - the total number of users.
 *                        - {Number} per_page - the number of users per page.
 *                        - {Number} status - The appropriate status code.
 * @throws {Error} - the error thrown while trying to get the users.
 */
export async function GET(req){
    try{
        // Extract query parameters from the request URL
        const url = new URL(req.url);
        const page = url.searchParams.get('page') ?? '1';
        const per_page = '5';

        const start = (Number(page) - 1) * Number(per_page);

        // Connect to the database
        await dbConnect();
        
        // Extract search parameters from the URL
        const searchText= url.searchParams.get('searchText') || "";

        // Initialize variable for storing users
        let limit;
        let users = "";

        // Handle sorting and filtering for users
        if (searchText) {
            // Users are sorted by username in ascending order
            users = await User.find({ 'username': { $regex: new RegExp(searchText, 'i') } })
                .collation({ locale: 'en', strength: 2 })
                .sort({ 'username': 1 })
                .skip(start).limit(Number(per_page));
            // Get the total number of users
            limit = await User.find({ 'username': { $regex: new RegExp(searchText, 'i') } }).countDocuments();
        } else {
            // Users are sorted by username in ascending order
            users = await User.find({})
                .sort({ 'username': 1 })
                .skip(start).limit(Number(per_page));
            // Get the total number of users
            limit = await User.countDocuments();
        }
        // const users = await User.find({}).skip(start).limit(Number(per_page));
        return NextResponse.json({users, limit, per_page}, {status: 200});
    } catch (error){
        // Return error message if there is an error
        return NextResponse.json({message: error.message}, {status: 500});
    }
}

/**
 * API route for updating a user.
 * @api
 * @param {Object} req - HTTP request object.
 * @returns {string} - the message indicating whether the user is updated.
 * @throws {Error} - the error thrown while trying to get the user.
 */
export async function PUT(req){
    try {
        // Extract the lookup username, username and password from the request body
        const {lookup, username, password} = await req.json();
        // Connect to the database
        await dbConnect();
        // Find the user by the lookup username
        const user = await User.findOne({ username: lookup });

        // Return error message if the user is not found
        if(!user) {
            return NextResponse.json({message: "User not found"}, {status: 404});
        }
        // Update the user
        user.username = username;
        user.password = password;
        // Save the user
        await user.save();

        // Return success message if the user is updated
        return NextResponse.json({message: "User updated successfully"}, {status: 200});
    } catch (error) {
        // Return error message if there is an error
        return NextResponse.json({message: error.message}, {status: 500});
    }
}

/**
 * API route for deleting a user.
 * @api
 * @param {Object} req - HTTP request object.
 * @returns {NextResponse} - Response containing:
 *                         - {String} message - Response message. 
 *                         - {Number} status - The appropriate status code.
 * @throws {Error} - the error thrown while trying to get the user.
 */
export async function DELETE(req){
    const {username} = await req.json();
    await dbConnect();

    const user = await User.findOneAndDelete({username: username});

    if(!user){
        return NextResponse.json({message: "User not deleted"}, {status: 404});
    }
    return NextResponse.json({message: "User deleted successfully"}, {status: 200});
}
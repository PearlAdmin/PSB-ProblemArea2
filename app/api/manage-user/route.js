import dbConnect from "@/libs/db";
import User from "@/models/users";
import { NextResponse } from "next/server";

/**
 * API route for creating authorized users.
 * @api
 * @param {Object} req - HTTP request object.
 * @returns {string} - the message indicating whether the user is already created.
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
 * @returns {User} - the list of users
 * @returns {Number} - the total number of users.
 * @returns {Number} - the number of users per page.
 * @throws {Error} - the error thrown while trying to get the users.
 */
export async function GET(req){
    try{
        const url = new URL(req.url);
        const page = url.searchParams.get('page') ?? '1';
        const per_page = '5';

        const start = (Number(page) - 1) * Number(per_page);

        await dbConnect();
        
        const searchText= url.searchParams.get('searchText') || "";

        let limit;
        let users = "";


        if (searchText) {
            users = await User.find({ 'username': { $regex: new RegExp(searchText, 'i') } })
                .collation({ locale: 'en', strength: 2 })
                .sort({ 'username': 1 })
                .skip(start).limit(Number(per_page));
            limit = await User.find({ 'username': { $regex: new RegExp(searchText, 'i') } }).countDocuments();
        } else {
            users = await User.find({})
                .sort({ 'username': 1 })
                .skip(start).limit(Number(per_page));
            limit = await User.countDocuments();
        }
        // const users = await User.find({}).skip(start).limit(Number(per_page));

        return NextResponse.json({users, limit, per_page}, {status: 200});
    } catch (error){
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
    const {lookup, username, password} = await req.json();
    await dbConnect();
    const user = await User.findOne({ username: lookup });
    if(!user) {
        return NextResponse.json({message: "User not found"}, {status: 404});
    }

    user.username = username;
    user.password = password;

    await user.save();

    return NextResponse.json({message: "User updated successfully"}, {status: 200});
}

/**
 * API route for deleting a user.
 * @api
 * @param {Object} req - HTTP request object.
 * @returns {string} - the message indicating whether the user is deleted.
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
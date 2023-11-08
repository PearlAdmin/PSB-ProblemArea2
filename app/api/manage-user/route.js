import dbConnect from "@/libs/db";
import User from "@/models/users";
import { NextResponse } from "next/server";


// CREATE NEW USER
export async function POST(req){
    const {username, password} = await req.json();

    await dbConnect();
    await User.create({username, password});

    return NextResponse.json({message: "User created successfully"}, {status: 201});
}

// GET ALL USERS
export async function GET(req){
    const url = new URL(req.url);
    const page = url.searchParams.get('page') ?? '1';
    const per_page = '5';

    const start = (Number(page) - 1) * Number(per_page);
    const end = start + Number(per_page);

    await dbConnect();
    const limit = await User.countDocuments();
    const users = await User.find({}).skip(start).limit(end);
    
    return NextResponse.json({users, limit, per_page}, {status: 200});
}

//UPDATE A USER (PUT)
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

//DELETE A USER
export async function DELETE(req){
    const {username} = await req.json();
    await dbConnect();

    const user = await User.findOneAndDelete({username: username});

    if(!user){
        return NextResponse.json({message: "User not deleted"}, {status: 404});
    }
    return NextResponse.json({message: "User deleted successfully"}, {status: 200});
}
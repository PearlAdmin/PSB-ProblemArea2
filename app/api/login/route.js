import dbConnect from "@/libs/db";
import User from "@/models/users";
import { NextResponse } from "next/server";

// GET USER
export async function POST(req){
    const data = await req.json();
    
    await dbConnect();
    console.log(data.username);
    const user = await User.findOne({username: data.username});
    
    if(!user){
        return NextResponse.json({message: "Username not found"}, {status: 404});
    }

    const isPasswordMatch = await user.comparePassword(data.password);

    if(!isPasswordMatch){
        return NextResponse.json({message: "Incorrect password!"}, {status: 401});
    }

    console.log(user);
    return NextResponse.json({
        message: "Login Successfully!",
        user: {
            username: user.username,
            role: user.role,
        },
    }, { status: 200 });
}
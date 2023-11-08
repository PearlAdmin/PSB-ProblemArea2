import dbConnect from "@/libs/db";
import User from "@/models/users";
import { NextResponse } from "next/server";

//GET USER
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

    return NextResponse.json({message: "Login Successfully!"}, {status: 200});
}
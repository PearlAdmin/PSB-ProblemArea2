import dbConnect from "@/libs/db";
import User from "@/models/users";
import { NextResponse } from "next/server";


export async function POST(req){
    const data = await req.json();
    await dbConnect();
    const user = await User.findOne({username: data.username});

    if(!user){
        return NextResponse.json(
            {message: "Username not found"},
            {status: 404},
        );
    }
    return NextResponse.json(
        {message: "Username found"},
        {status: 200}
    );
}
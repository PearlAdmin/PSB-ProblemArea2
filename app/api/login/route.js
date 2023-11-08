import dbConnect from "@/libs/db";
import User from "@/models/users";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

//GET USER
export async function GET(req){
    const data = await req.json();
    console.log(data);
    // const SALT_WORK_FACTOR = 10;
    // const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    // const hash = await bcrypt.hash(password, salt)


    // await dbConnect();
    // const user = await User.findOne({username: username});
    
    // if(!user){
    //     return NextResponse.json({message: "Username not found"}, {status: 404});
    // }

    // if(hash != user.password){
    //     return NextResponse.json({message: "Incorrect password!"}, {status: 401});
    // }

    // return NextResponse.json({message: "Login Successfully!"}, {status: 200});
}
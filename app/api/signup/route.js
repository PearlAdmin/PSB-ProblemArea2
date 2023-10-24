import {NextResposne} from "next/server";
import bcrypt from "bcrypt";

export async function POST(req) {
    const {name, email, password} = await req.json();
    
}
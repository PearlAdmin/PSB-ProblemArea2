import dbConnect from "@/libs/db";
import Question from "@/models/questions";
import {NextResponse} from "next/server";

// CREATE A NEW QUESTION
export async function POST(req) {
    const { question, inputType, number, deletable } = await req.json();

    await dbConnect();
    await Question.create({ question, inputType, number, deletable });

    return NextResponse.json({message: "Question created successfully"}, {status: 201});
}

// GET ALL QUESTIONS
export async function GET(req) {
    await dbConnect();
    
    const questions = await Question.find({});
    return NextResponse.json({questions}, {status: 200});
}

// DELETE A QUESTION
// UPDATE A QUESTION
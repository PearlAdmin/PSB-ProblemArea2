import dbConnect from "@/libs/db";
import Question from "@/models/questions";
import {NextResponse} from "next/server";

// CREATE A NEW QUESTION
export async function POST(req) {
    const { question, inputType, deletable, required, choices } = await req.json();

    try {
        await dbConnect();
        const number = await Question.countDocuments();
        await Question.create({ question, inputType, number, deletable, required, choices});
        return NextResponse.json({message: "Question created successfully"}, {status: 201});
    } catch (error) {
        return NextResponse.json({message: error.message}, {status: 500}); 
    }
}

// GET ALL QUESTIONS
export async function GET() {
    try {
        await dbConnect();
        const questions = await Question.find({});
        return NextResponse.json({questions}, {status: 200});
    } catch (error) {
        return NextResponse.json({message: error.message}, {status: 500}); 
    }
}

// DELETE A QUESTION
// UPDATE A QUESTION
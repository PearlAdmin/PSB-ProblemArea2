import dbConnect from "@/libs/db";
import Question from "@/models/questions";
import {NextResponse} from "next/server";

// CREATE A NEW QUESTION
export async function POST(req) {
    const toInsert = await req.json()
    // console.log("POST", toInsert);
    if (Array.isArray(toInsert)){
        try {
            await dbConnect();

            await Question.deleteMany({});
            let updatedVersion;
            toInsert.map((item, i) => {
                delete item._id
                item.number = i + 1
                delete item.__v
                if (item.version !== undefined) {
                    updatedVersion = item.version + 1;
                }
                item.version = item.version + 1
            });

            toInsert.map((item) => {
                if (item.version.toString() === 'NaN') {
                    item.version = updatedVersion;
                }
            })

            await Question.create(toInsert);
            return NextResponse.json({message: "Question created successfully"}, {status: 201});
        } catch (error) {
            return NextResponse.json({message: error.message}, {status: 500}); 
        }
    } else {
        const { question, inputType, deletable, required, choices } = toInsert;
        try {
            await dbConnect();
            const number = await Question.countDocuments() + 1;
            await Question.create({ question, inputType, number, deletable, required, choices});
            return NextResponse.json({message: "Question created successfully"}, {status: 201});
        } catch (error) {
            return NextResponse.json({message: error.message}, {status: 500}); 
        }
    }
}

// GET ALL QUESTIONS
export async function GET() {
    try {
        await dbConnect();
        const questions = await Question.find({}).sort({"number": 1});
        return NextResponse.json({questions}, {status: 200});
    } catch (error) {
        return NextResponse.json({message: error.message}, {status: 500}); 
    }
}


import dbConnect from "@/libs/db";
import Question from "@/models/questions";
import {NextResponse} from "next/server";

// CREATE A NEW QUESTION
export async function POST(req) {
    const toInsert = await req.json()
    console.log("toInsert: ",toInsert)
    if (Array.isArray(toInsert)){
        try {
            await dbConnect();

            await Question.deleteMany({});

            toInsert.map((item, i) => {
                delete item._id
                item.number = i + 1
                delete item.__v
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

// DELETE A QUESTION
// export async function DELETE() {
//     try {
//         await dbConnect();
//         await Question.deleteMany({});
//         return NextResponse.json({status: 200});
//     } catch (error) {
//         return NextResponse.json({message: error.message}, {status: 500}); 
//     }
// }

// UPDATE A QUESTION

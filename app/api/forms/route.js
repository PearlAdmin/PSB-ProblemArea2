import dbConnect from "@/libs/db";
import Question from "@/models/questions";
import {NextResponse} from "next/server";

/**
 * API route for creating a question.
 * @api
 * @param {Object} req - HTTP request object.
 * @returns {string} - the question created.
 * @returns {string} - the input type of the question created.
 * @returns {string} - the number identifier of the question created.
 * @returns {boolean} - indicates whether the question is deletable.
 * @returns {[string]} - an array of choices for the question. Applicable only for 'radio' and 'checkbox' input types.
 * @throws {Error} - the error thrown while trying to create the question.
 */
export async function POST(req) {
    const toInsert = await req.json()
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

/**
 * API route for getting all questions.
 * @api
 * @param {Object} req - HTTP request object.
 * @returns {Question} - the list of questions.
 * @throws {Error} - the error thrown while trying to get the questions.
 */
export async function GET() {
    try {
        await dbConnect();
        const questions = await Question.find({}).sort({"number": 1});
        return NextResponse.json({questions}, {status: 200});
    } catch (error) {
        return NextResponse.json({message: error.message}, {status: 500}); 
    }
}


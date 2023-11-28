import dbConnect from "@/libs/db";
import Question from "@/models/questions";
import {NextResponse} from "next/server";

/**
 * API route for creating a question.
 * @api
 * @param {Object} req - HTTP request object.
 * @return {NextResponse} - Response containing:
 *                        - {String} message - Response message.
 *                        - {Number} status - The appropriate status code.
 * @throws {Error} - the error thrown while trying to create the question.
 */
export async function POST(req) {
    const toInsert = await req.json()

    // Check if the request body is an array
    if (Array.isArray(toInsert)){
        try {
            await dbConnect();

            // Delete all questions
            await Question.deleteMany({});

            // Insert the new questions
            let updatedVersion;
            toInsert.map((item, i) => {
                // Delete the _id and __v fields
                delete item._id
                item.number = i + 1
                delete item.__v

                // Update the version
                if (item.version !== undefined) {
                    updatedVersion = item.version + 1;
                }

                // Increment the version
                item.version = item.version + 1
            });

            // Update the version of the questions with version NaN
            toInsert.map((item) => {
                if (item.version.toString() === 'NaN') {
                    item.version = updatedVersion;
                }
            })

            // Insert the new questions
            await Question.create(toInsert);

            // Return the response
            return NextResponse.json({message: "Question created successfully"}, {status: 201});
        } catch (error) {
            // Return the error
            return NextResponse.json({message: error.message}, {status: 500}); 
        }
    } else {
        // Check if the request body is an object
        const { question, inputType, deletable, required, choices } = toInsert;
        try {
            // Connect to the database
            await dbConnect();
            // Create the question
            const number = await Question.countDocuments() + 1;
            // Create the question
            await Question.create({ question, inputType, number, deletable, required, choices});
            // Return the response
            return NextResponse.json({message: "Question created successfully"}, {status: 201});
        } catch (error) {
            // Return the error
            return NextResponse.json({message: error.message}, {status: 500}); 
        }
    }
}

/**
 * API route for getting all questions.
 * @api
 * @param {Object} req - HTTP request object.
 * @return {NextResponse} - Response containing:
 *                        - {Question} - the list of questions.
 *                        - {Number} status - The appropriate status code.
 *                        - {String} message - Response message.
 * @throws {Error} - the error thrown while trying to get the questions.
 */
export async function GET() {
    try {
        await dbConnect();
        // Get all questions
        const questions = await Question.find({}).sort({"number": 1});
        // Return the response
        return NextResponse.json({questions}, {status: 200});
    } catch (error) {
        // Return the error
        return NextResponse.json({message: error.message}, {status: 500}); 
    }
}


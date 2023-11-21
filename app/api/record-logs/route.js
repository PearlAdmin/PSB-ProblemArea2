import dbConnect from "@/libs/db";
import {NextResponse} from "next/server";
import Log from "@/models/logs";

export async function GET(req) {
    try {
        const url = new URL(req.url);
        const id = url.searchParams.get('id');
        const page = url.searchParams.get('page') ?? '1';
        await dbConnect();
    } catch (error) {
        return NextResponse.json({message: error.message}, {status: 500});
    }
}
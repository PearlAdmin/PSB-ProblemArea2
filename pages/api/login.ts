import { NextApiRequest, NextApiResponse } from "next";
import Users from "@/models/userModels";
import dbConnect from "@/lib/db";

export default async function userLogin(req: NextApiRequest, res: NextApiResponse) {
    const { body } = req;

    try {
        await dbConnect();
        const username = body.username;
        const password = body.password;

        if (!username || !password) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

        console.log(username, password);
        const isCorrect = await Users.findOne({ username: username, password: password });
        
        if (!isCorrect) {
            console.log("Incorrect username or password");
            return res.status(400).json({ message: "Incorrect username or password" });
        }
    } catch (error) {
        res.status(500);
    } finally {
        res.end();
    }
}
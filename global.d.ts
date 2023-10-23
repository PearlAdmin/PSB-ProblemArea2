import mongoose from "mongoose";

export type MongooseConnection = {
    conn: typeof mongoose | null;
    promise: Promse<typeof mongoose> | null;
}

declare global {
    var mongoose: MongooseConnection

    namespace NodeJS {
        interface ProcessEnv {
            MONGODB_URI: string,
            NEXTAUTH_URL: string,
            NEXTAUTH_SECRET: string
        }
    }
}
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import {AuthOptions} from "next-auth";
import User from "@/models/userModels";
import dbConnect from "@/lib/db";

const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "Username"},
                password: { label: "Password", type: "password", placeholder: "Password"}
            },
            async authorize(credentials) {
                let user;
                try {
                    await dbConnect();
                    user = await User.findOne({username: credentials?.username, password: credentials?.password});
                } catch {
                    throw new Error("Cannot connect to database.");
                }
                if (!user) {
                    throw new Error("Incorrect username or password.");
                }

                return user;
            }
        })
    ],
    session: {
        strategy: "jwt"
    },
    callbacks: {
        session({session, token}){
            session.user.id = token.id;
            return session;
        },
        jwt({token, account, user}){
            if (account) {
                token.accessToken = account.accessToken;
                token.id = account.id;
            }
            return token;
        }
    },
    pages: {
        signIn: "/login",
        error: "/login"
    },
};

export default NextAuth(authOptions);
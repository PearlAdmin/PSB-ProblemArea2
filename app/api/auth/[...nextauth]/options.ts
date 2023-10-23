import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import users from '@/models/users';
import dbConnect from '@/lib/db';

export const options: NextAuthOptions = {
    session: {
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text", placeholder: "Username"},
                password: { label: "Password", type: "password", placeholder: "Password" }
            },
            async authorize(credentials) {
                await dbConnect();
                const user = await users.findOne({username: credentials?.username, password: credentials?.password});

                if (user)
                    return {name: user.username, isAdmin: user.isAdmin};
                
                // Return null if user data could not be retrieved
                return null as any;
            }
        })
    ],
    pages: {
        signIn: '/api/auth/signIn',
    },
    callbacks: {
        async jwt({token, user}){
            if (user) {
                token.isAdmin = user.isAdmin;
            }
            return token;
        },
        async session({session, token}) {
            if (session?.user) {
                session.user.isAdmin = token.isAdmin;
            }
            return session;
        }
    }
}

export default options;
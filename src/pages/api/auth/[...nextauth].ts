import { signIn } from "@/services/auth/services";
import { compare } from "bcrypt";
import NextAuth from "next-auth/next";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from "jsonwebtoken";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            type: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const { email, password } = credentials as {
                    email: string;
                    password: string;
                };
                const user: any = await signIn(email);
                if (user) {
                    const passwordConfirm = await compare(
                        password,
                        user.password
                    );

                    if (passwordConfirm) {
                        return user;
                    }
                    return null;
                } else {
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, account, user }) {
            if (account?.provider === "credentials") {
                token.email = user.email;
                token.name = user.name;
                token.id = user.id;
            }

            return token;
        },

        async session({ session, token }: any) {
            if ("email" in token) {
                session.user.email = token.email;
            }
            if ("name" in token) {
                session.user.name = token.name;
            }
            if ("id" in token) {
                session.user.id = token.id;
            }

            const accessToken = jwt.sign(token, process.env.NEXTAUTH_SECRET || "", { algorithm: "HS256" });
            session.accessToken = accessToken;

            return session;
        },
    },
    pages: {
        signIn: "/auth/login",
    },
};

export default NextAuth(authOptions);

import { retrieveDataById, updateData } from "@/lib/firebase/service";
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "GET") {
        const token = req.headers.authorization?.split(" ")[1];
        if (token) {
            jwt.verify(
                token,
                process.env.NEXTAUTH_SECRET || "",
                async (err: any, decoded: any) => {
                    if (decoded) {
                        const user = await retrieveDataById(
                            "users",
                            decoded.id
                        );

                        if (user) {
                            user.id = decoded.id;
                            const { id }: any = req.query;
                            if (id && id[0]) {
                                user.notes = user.notes.find(
                                    (note: any) => note.id === id[0]
                                );
                            }
                            res.status(200).json({
                                status: true,
                                statusCode: 200,
                                message: "success",
                                data: user.notes,
                            });
                        } else {
                            res.status(400).json({
                                status: false,
                                statusCode: 400,
                                message: "failed",
                                data: {},
                            });
                        }
                    }
                }
            );
        }
    } else if (req.method === "PUT") {
        const token = req.headers.authorization?.split(" ")[1];
        if (token) {
            jwt.verify(
                token,
                process.env.NEXTAUTH_SECRET || "",
                async (err: any, decoded: any) => {
                    if (decoded) {
                        const user: any = await retrieveDataById(
                            "users",
                            decoded.id
                        );
                        let { data } = req.body;
                        const { id }: any = req.query;

                        if (id && id[0]) {
                            user.notes = user.notes.map((note: any) => {
                                if (note.id === id[0]) {
                                    return data;
                                } else {
                                    return note;
                                }
                            });
                            data = { notes: user.notes };
                        }

                        await updateData(
                            "users",
                            decoded.id,
                            data,
                            (result: boolean) => {
                                if (result) {
                                    res.status(200).json({
                                        status: true,
                                        statusCode: 200,
                                        message: "success",
                                        data: {},
                                    });
                                } else {
                                    res.status(400).json({
                                        status: false,
                                        statusCode: 400,
                                        message: "failed",
                                        data: {},
                                    });
                                }
                            }
                        );
                    }
                }
            );
        }
    }
}

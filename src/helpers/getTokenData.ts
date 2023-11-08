import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getTokenData = (req: NextRequest) => {
    try {
        const token = req.cookies.get("token")?.value || '';

        if (!token) throw new Error("No token found");

        const verified = jwt.verify(token, process.env.TOKEN_SECRET!);

        return verified;
    } catch (error) {
        throw new Error("Invalid token");
    }
}

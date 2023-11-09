import { connect } from "@/dbconfig/dbconfig"
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(req: NextRequest) {

    try {

        const resBody = await req.json();
        const { email, password } = resBody;

        // user not found
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        // compare password
        const isMatch = await bcryptjs.compare(password, user.passwordHash);
        if (!isMatch) {
            return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
        }

        // create token data
        const tokenData = {
            id: user._id,
            name: user.name,
            email: user.email,
        };

        // create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" });

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
            token,
        }, { status: 200 });

        // set cookie
        response.cookies.set("token", token, {
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });

        response.headers.set("Cache-Control", "private, no-cache, no-store, must-revalidate");

        return response;
    } catch (error) {
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}

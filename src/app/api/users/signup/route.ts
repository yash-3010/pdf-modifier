import { connect } from "@/dbconfig/dbconfig"
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs";

connect();

export async function POST(req: NextRequest) {

    try {


        const { name, email, password } = await req.json();

        // validate name
        if (!name || name.length < 3) {
            return NextResponse.json({ message: "Name is required" }, { status: 400 });
        }

        // validate email
        if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            return NextResponse.json({ message: "Invalid email" }, { status: 400 });
        }

        // validate password
        if (!password || !password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)) {
            return NextResponse.json({ message: "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter and one number" }, { status: 400 });
        }

        // user already exists
        const user = await User.findOne({ email });
        if (user) {
            return NextResponse.json({ message: "User already exists" }, { status: 400 });
        }

        // hash password
        const salt = await bcryptjs.genSalt(10);
        const passwordHash = await bcryptjs.hash(password, salt);

        // create user
        const newUser = new User({
            name,
            email,
            passwordHash,
        });

        // save user
        await newUser.save();

        // send response
        return NextResponse.json({
            message: "User created successfully",
            success: true,
            newUser,
        }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}

import { connect } from "@/dbconfig/dbconfig";
import { verifyToken } from "@/helpers/verifyToken";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(req:NextRequest){
    try {
        const userData = await verifyToken(req);
        const user = await User.findOne({ _id: userData.id }).select("-passwordHash");
        return NextResponse.json({ user });

    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

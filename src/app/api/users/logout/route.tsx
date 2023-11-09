import { NextResponse } from "next/server"

export async function GET(){
    try {
        const res = NextResponse.json({
            message: "Logout successful",
            status: true,
        })

        res.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0),
        });

        // cache control
        res.headers.set("Cache-Control", "private, no-cache, no-store, must-revalidate");

        return res;

    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

import { jwtVerify } from "jose";
import { NextRequest } from "next/server";

export async function verifyToken(req: NextRequest) {
    const token = req.cookies.get('token')?.value

    if (!token) throw new Error('No token found.')

    try {
      const verified = await jwtVerify(
        token,
        new TextEncoder().encode(process.env.TOKEN_SECRET!)
      )
      return verified.payload
    } catch (err) {
      throw new Error('Invalid token.')
    }
  }

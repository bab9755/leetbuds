import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

export async function POST(req: Request) {
    const token = await cookies().get('jwt')
    if(!token) return Response.json({"error": "No cookie was set."})
    const secretKey = new  TextEncoder().encode('your-secret-key')

    const userid = await jwtVerify(token, secretKey)
}
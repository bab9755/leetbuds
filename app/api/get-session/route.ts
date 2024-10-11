import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

export async function GET(req: Request) {

    try{
        const token = await cookies().get('jwt')
        if(!token) return Response.json({"error": "No cookie was set."})
        const secretKey = new TextEncoder().encode('your-secret-key')

        const userid = await jwtVerify(token.value, secretKey)

        return Response.json({userId: userid.payload.userId})

    } catch (error){
        return Response.json({"error": `An error occured generating the session: ${error}.`})
    }
    
}
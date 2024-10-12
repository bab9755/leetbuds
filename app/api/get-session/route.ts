import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { getUserById } from "@/lib/db/db";
import next from "next";
export async function GET(req: Request) {

    try{
        const token = await cookies().get('jwt')
        if(!token) return Response.json({"error": "No cookie was set."})
        const secretKey = new TextEncoder().encode('your-secret-key')

        const userid = await jwtVerify(token.value, secretKey)
        const user = await getUserById(userid.payload.userId);

        const userName = user?.name
        const progress = user?.questionsCompleted || 0
        const email = user?.email
        const nextInterview = user?.upcomingInterviews[0] || 0
        


        
         
        return Response.json({
            userId: userid.payload.userId,
            userName: userName, 
            email: email,
            progress: progress,
            nextInterview: nextInterview,
        })

    } catch (error){
        return Response.json({"error": `An error occured generating the session: ${error}.`})
    }
    
}
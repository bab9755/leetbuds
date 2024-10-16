import { NextResponse } from "next/server"
import { fetchUsersButSelf } from "@/lib/db/db"

export async function POST(req: Request){
    try{
        const { id } = await req.json()
        const users = await fetchUsersButSelf(id);
        return Response.json({users: users})
    }catch(error){
        return Response.json({'Error': 'Error getting the users'})
    }
    

}
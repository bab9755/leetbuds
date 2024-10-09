import { createUser, getDB } from "@/lib/db/db";
import { createJWT } from "@/lib/utils";
import { cookies } from "next/headers";


export async function POST(req: Request){
    const { email, password } = await req.json();
}   
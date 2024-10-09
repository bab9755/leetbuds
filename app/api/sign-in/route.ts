import { createUser, getDB } from "@/lib/db/db";
import { createJWT } from "@/lib/utils";
import { cookies } from "next/headers";
import { getUserByEmail } from "@/lib/db/db";
import * as bcrypt from 'bcrypt'

export async function POST(req: Request){

    try {

        const { email, password } = await req.json();
        const user = await getUserByEmail(email);
        if (!user){
            return Response.json({'error': 'Please sign up first'}, {status: 400})
        }
    
        const salt = 10;
            //hash the password for the user
        const hashedPassword = await bcrypt.hash(password, salt)
        if (hashedPassword == user?.passwordHash){
            return Response.json({'error': 'Invalid email or password, please try again'}, {status: 400})
        }

        const token = await createJWT(user._id);

        if(token){
            cookies().set('jwt', token, {
                expires: new Date(Date.now() + 86400000), // Cookie expires in 1 day
                path: '/',
                httpOnly: true,
                secure: true,
            });

            console.log(`The cookie was successfully set!`)
        } else {
            console.log('There was an error generating the token')
        }
        return Response.json({'token': token})
    } catch (error){
        return Response.json({'error': 'Error Logging in.'}, {status: 400})
    }
    

}   
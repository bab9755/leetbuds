import { createUser, getDB } from "@/lib/db/db";
import { createJWT } from "@/lib/utils";
import { cookies } from "next/headers";
export async function POST(req: Request){

    try{
        const { name, email, password } = await req.json()

        const options = {
            email: email
        }
        const collection = await getDB('leetbuds', 'users')

        const oldUser = await collection?.findOne(options)

        if (oldUser){
            return Response.json({"message": 'The user already exists'}, {status: 400})
        }
        //create the new user
        const newUser = await createUser(name, email, password);
        const token = await createJWT(newUser?.insertedId);
        //but the token inside of the cookie
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
        return Response.json({'error': 'An error occured signing the user up'}, {status: 400})
    }
    

}
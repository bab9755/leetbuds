//notifictions api based on user id
import {getDB} from "@/lib/db/db";
import { request } from "http";
import { ObjectId } from "mongodb";

export async function GET(req: Request, context: {params: any}) {
    const userId = context.params.user
    try{
        const userCollection = await getDB('leetbuds', 'users');
        const user = await userCollection?.findOne({_id: new ObjectId(userId)})
        if (!user){
            return Response.json({'Error': 'Error getting the user'})
        }
        return Response.json({
            message: `sucessfuly found a user`,
            notifications: user?.notifications || []
        })
    }catch(error){
        return Response.json({'Error': `Error getting the user: ${error}`})
    }
}


export async function POST(req: Request, context: {params: any}) {
    const userId = context.params.user
    try{
        const {searchParams} = new URL(req.url);
        const {name, type} = await req.json();
        const userCollection = await getDB('leetbuds', 'users');
        const newNotification = {
            name: name,
            type: type, //a type can be either 'friendRequest' or 'interview', or 'completed problem'
            createdAt: new Date(),
            updatedAt: new Date(),
        }
        const user = await userCollection?.findOne({_id: new ObjectId(userId)})
        if(!user){
            return Response.json({'Error': 'Error getting the user from the database'}, {status: 400})                 
        }
        const notifications = user?.notifications || []
        notifications.push(newNotification) //append to the current array of notifications
        await userCollection?.updateOne({_id: new ObjectId(userId)}, {$set: {notifications: notifications}}) //update the user object
        return Response.json({
            message: 'sucessfuly saved the notification for the user'
        })
    }catch(error){    
        return Response.json({'Error': `Error saving the notification for the user: ${error}`})
    }
}   


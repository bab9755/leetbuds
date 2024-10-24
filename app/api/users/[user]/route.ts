import { getDB } from "@/lib/db/db";
import { ObjectId } from "mongodb";
import next from "next";


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
            userId: user?._id,
            progress: user?.questionsCompleted || 0, //how many questions have been completed
            nextInterview: user?.upcomingInterviews[0], //the next upcoming interview
            answeredQuestions: user?.solvedQuestions //these are the ids of the questions the user solved
        })



    }catch(error){
        return Response.json({'Error': `Error getting the user: ${error}`})
    }
}


export async function POST(req: Request, context: {params: any}) {
    const userId = context.params.user
    try{
        const {searchParams} = new URL(req.url);
        const friendId = searchParams.get('friendId');
        if(!friendId) return Response.json({'Error': 'Error getting the friend id from the params'})
        const userCollection = await getDB('leetbuds', 'users');
        const user = await userCollection?.findOne({_id: new ObjectId(userId)})
        const friend = await userCollection?.findOne({_id: new ObjectId(friendId)})
        if(!user){
            return Response.json({'Error': 'Error getting the user from the database'}, {status: 400})
        }
        if(!friend){
            return Response.json({'Error': 'Error getting the friend from the database'}, {status: 400})
        }
        const friendRequests = friend?.friendRequests || []
        friendRequests.push(userId)
        await userCollection?.updateOne({_id: new ObjectId(friendId)}, {$set: {friendRequests: friendRequests}})
        const response = await fetch(process.env.SERVER_URL +`/api/users/${friendId}/notifications`, {method: 'POST', body: JSON.stringify({name: 'You got a friend request', type: 'friendRequest'})})
        if (!response.ok){
            return Response.json({"Error": `Error sending the notification to the user`}, {status: 400})
        }
        return Response.json({
            message: 'sucessfuly sent a friend request to the other user'
        },
        {status: 200})
    }catch(error){
        return Response.json({'Error': `Error sending a friend request: ${error}`})
    }
}





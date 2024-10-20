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
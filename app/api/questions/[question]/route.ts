import { getDB } from "@/lib/db/db";
import { ObjectId } from "mongodb";



export async function POST(req: Request, context: {params: any}){
    const questionId = context.params.question //get the questionID dynamically from the parameters

    try{
        //also need to send a body where it says that the question was completed or not

        const {searchParams} = new URL(req.url);
        const userId = searchParams.get('userId');
        if(!userId) return Response.json({'Error': 'Error getting the user id from the params'})

        const userCollection = await getDB('leetbuds', 'users');
        const user = await userCollection?.findOne({_id: new ObjectId(userId)})
        if(!user){
            return Response.json({'Error': 'Error getting the user'})
        }
        const questionsCompleted = user?.questionsCompleted || 0
        let solvedQuestions = user?.solvedQuestions || []
        solvedQuestions = solvedQuestions.push(questionId)
        await userCollection?.updateOne({_id: new ObjectId(userId)}, {$set: {questionsCompleted: questionsCompleted + 1, solvedQuestions: solvedQuestions}})//udpate the count for solved questions
        await userCollection
        

    }catch(error){
        return Response.json({'Error': `Error saving the question for the user: ${error}`})
    }
}
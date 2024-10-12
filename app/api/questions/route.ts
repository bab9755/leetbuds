import { uploadQuestions } from "@/lib/db/db";
import { blind75 } from "@/lib/utils";

export async function POST(req: Request){
    try{
        const result =  await uploadQuestions(blind75);
        return Response.json({result: result})
    } catch (error){
        return Response.json({'Error': `There was an error uploading the quesitons`})
    }
}

export async function GET(req: Request){
    
}

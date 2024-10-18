import { addFriend } from "@/lib/db/db";


export async function POST(req: Request){

    try{
        const {searchParams} = new URL(req.url);
        const userId1 = searchParams.get('userId1');
        const userId2 = searchParams.get('userId2');
        await addFriend(userId1, userId2);
        return Response.json({'message': 'Friend added successfully'})
    }catch (error){
        return Response.json({'Error': 'Error getting the users'}, {status: 400})
    }
}
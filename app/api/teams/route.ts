import { addFriend, getDB } from "@/lib/db/db";
import { ObjectId } from "mongodb";


export async function POST(req: Request){

    try{
        const {searchParams} = new URL(req.url);


        const userId1 = searchParams.get('userId1');
        const userId2 = searchParams.get('userId2');
        console.log(`The retrieved id's are ${userId1} and ${userId2}`)
        if(!userId1 || !userId2){
            return Response.json({'Error': 'Error getting the user ids from the params'}, {status: 400})
        }
        const user1query = {_id: new ObjectId(userId1)}
        const user2query = {_id: new ObjectId(userId2)}
        console.log(`The retrieved queries are ${user1query._id} and ${user2query._id}`)
        const userCollection = await getDB('leetbuds', 'users');
        const user1 = await userCollection?.findOne(user1query)
        const user2 = await userCollection?.findOne(user2query)
        console.log(`${user1} and ${user2} are being processed`)

        if (!user1 || !user2){
            return Response.json({'Error': 'Error getting the users'}, {status: 400})
        }

        //now that we know we got the right users, we need to make sure that they are not in the same team
        if (!user1?.teamId && !user2?.teamId){
            const teamCollection =  await getDB('leetbuds', 'teams');
            const team = await teamCollection?.insertOne({teamMembers: [userId1, userId2]})
            const user1 = await userCollection?.updateOne(user1query, {$set: {teamId: team?.insertedId}})
            const user2 = await userCollection?.updateOne(user2query, {$set: {teamId: team?.insertedId}})
            return Response.json({'message': 'Team created successfully for user 1 and user 2'})
        }
        if (user2?.teamId){
            return Response.json({'Error': 'User is already in a team'}, {status: 400})
        }
        if (user1?.teamId){
            const teamId = user1?.teamId
            const teamCollection =  await getDB('leetbuds', 'teams');
            const team = await teamCollection?.findOne({_id: new ObjectId(teamId)})
            team?.teamMembers?.push(userId2)
            const result = await teamCollection?.updateOne({_id: new ObjectId(teamId)}, {$set: {teamMembers: team?.teamMembers}})
            const user2 = await userCollection?.updateOne(user2query, {$set: {teamId: teamId}})
            return Response.json({'message': 'Friend added successfully'})
        }
        return Response.json({'message': 'Friend added successfully'})
    }catch (error){
        return Response.json({'Error': `Error adding the friends: ${error}`}, {status: 400})
    }
}
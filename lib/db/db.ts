import { MongoClient, ObjectId } from "mongodb";
import * as jose from 'jose'
import * as bcrypt from 'bcrypt'
import { blind75 } from "../utils";

    const client = new MongoClient(process.env.MONGODB_URI || '');
    if (!client){
        console.log('Sucessfully connected the client to the DB.');
    }



export const getDB = async (databaseName: string, collectionName: string) => {

    try{
        const database = client?.db(databaseName);
        const collection = database?.collection(collectionName)
        return collection;
    }catch(error){
        console.log(`An error occured getting/creating the DB: ${error}`)
    }
    
}

export const createUser = async (name: string, email: string, password: string) => {
    
    try{
        const userCollection = await getDB('leetbuds', 'users');

        const salt = 10;
        //hash the password for the user
        const hashedPassword = await bcrypt.hash(password, salt)

        const userSchema = {
            name: name,
            email: email,
            passwordHash: hashedPassword,
            teamId: null,
            solvedQuestions: [], //will contained the id of each solved question
            questionsCompleted: 0, //the number of completed questions
            upcomingInterviews: [] //the different interviews that will happen for the user.

        }
        const user = await userCollection?.insertOne(userSchema)
        return user;
    } catch (error){
        console.log(`An error occured creating a new user: ${error}`)
    }
}

export const getUserById = async (id: any) => {
    try{
        const userCollection = await getDB('leetbuds', 'users');
        const objectId = new ObjectId(id)
        const user = await userCollection?.findOne({_id: objectId})
        return user
    }catch (error){
        console.log(`An error occured getting the user by Id: ${error}`)
    }
}



export const getUserByEmail = async (email: string) => {
    const userCollection = await getDB('leetbuds', 'users');
    const user = await userCollection?.findOne({ email: email})
    return user;
  }


export const uploadQuestions = async (questionsArray: any) => {
    const questionsCollection = await getDB('leetbuds', 'questions')
    const result = questionsCollection?.insertMany(questionsArray)
    return result
  }
  
export const fetchUsersButSelf = async(id: any) => {
    const userCollection = await getDB('leetbuds', 'users')
    const users = await userCollection?.aggregate([
        {
            $match: {
                _id: {$ne: new ObjectId(id)}
            }
        }
    ]).toArray()
    console.log(`Here are the retrieved users: ${users}`)
    return users
}


export const createTeam = async (userId: any) =>{
    const teamCollection = await getDB('leetbuds', 'teams');
    const id = new ObjectId(userId)

    const team = await teamCollection?.insertOne({teamMembers: [id]}) //append the user to teh new team
    const user = await getUserById(userId)
    if (user){
        user.teamId = team?.insertedId
    }
    return team //return the newly created team
}
export const addUserToTeam = async (teamId: any, userId: any) => {
    const teamCollection = await getDB('leetbuds', 'teams');
    const team = await teamCollection?.findOne({_id: new ObjectId(teamId)})
    team?.teamMembers?.push(userId)
    const result = await teamCollection?.updateOne({_id: new ObjectId(teamId)}, {$set: {teamMembers: team?.teamMembers}})
    return result
}

export const addFriend = async (userId: any, anotherUserId: any) => {
    const user = await getUserById(userId)
    if (!user?.teamId){
        const team = await createTeam(userId) //create a team using the primary user id
        const result = await addUserToTeam(team?.insertedId, anotherUserId)
    } 

}

export interface User {
    _id: string;         // or ObjectId if you're using ObjectId
    name: string;
    email: string;
    // Add other fields that are present in your user documents
  }



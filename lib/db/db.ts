import { MongoClient } from "mongodb";
import * as jose from 'jose'
import * as bcrypt from 'bcrypt'

    const client = new MongoClient(process.env.MONGODB_UR || '');
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
        }
        const user = await userCollection?.insertOne(userSchema)
        return user;
    } catch (error){
        console.log(`An error occured creating a new user: ${error}`)
    }
}


export const getUserByEmail = async (email: string) => {
    const userCollection = await getDB('leetbuds', 'users');
    const user = await userCollection?.findOne({ email: email})
    return user;
  }

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { cookies } from "next/headers"
import { SignJWT } from 'jose'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const createJWT = async (userId: any) => {
  try{
    const secretKey = new  TextEncoder().encode('your-secret-key')
    //use user id as the payload and sign with our secret
    const token =  new SignJWT({ userId: userId }).setProtectedHeader({alg: 'HS256'}).setIssuedAt().setExpirationTime('2h').sign(secretKey)
    return token;
  } catch(error) {
    console.log(`An error occured Generating the token: ${error}`)
  }
  
}


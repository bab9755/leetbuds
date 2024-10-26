import { Button } from "./ui/button";
import {useState} from 'react'
import { acceptFriendRequest } from "@/lib/db/db";


export default function AcceptRequestButton({userId, senderId}:{userId: string, senderId: string}) {
    const [accepted, setAccepted] = useState(false);


    const acceptRequest = async(userId: string, senderId: string) => {
        await acceptFriendRequest(userId, senderId);
    }
    return (
        <div className="flex items-center justify-between">
            <Button size="sm" className={accepted?'bg-green-500 text-white' : 'bg-indigo-500 text-white'} variant="outline" onClick={() => {acceptRequest(userId, senderId); setAccepted(true)}}>{accepted ? <span>Accepted!</span> : <span>Accept</span> }</Button>      
        </div>  
    )   
}   
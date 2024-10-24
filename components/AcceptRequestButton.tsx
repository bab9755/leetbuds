import { Button } from "./ui/button";
import {useState} from 'react'




export default function AcceptRequestButton({userId, senderId}:{userId: string, senderId: string}) {
    const [accepted, setAccepted] = useState(false);


    const acceptRequest = async(userId: string, senderId: string) => {
        const response = await fetch(`/api/teams?userId1=${userId}&userId2=${senderId}`, {method: 'POST', body: JSON.stringify({id: 'test'})})
    }
    return (
        <div className="flex items-center justify-between">
            <Button size="sm" className={accepted?'bg-green-500 text-white' : 'bg-indigo-500 text-white'} variant="outline" onClick={() => acceptRequest(userId, senderId)}>{accepted ? <span>Accepted!</span> : <span>Accept</span> }</Button>      
        </div>  
    )   
}   
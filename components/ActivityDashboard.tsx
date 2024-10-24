import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Bell, Divide, User, Check, Headset } from 'lucide-react';
import {useEffect, useState} from 'react'
import AcceptRequestButton from "./AcceptRequestButton"

interface NotificationProps {
    id: string,
    name: string,
    time?: Date,
    type: string,
}

export default function ActivitityDashboard({userId}: {userId: string}) {


    //based on the userid, fetch the notifications
    const [notifications, setNotifications] = useState<NotificationProps[]>([]);
    const fetchNotifications = async(userId: string) => {

        try{
            const response = await fetch(process.env.SERVER_URL + `/api/users/${userId}/notifications`, {method: 'GET', body: JSON.stringify({limit: 10})})
            if (!response.ok) {
                console.log(`An error occured fetching the notifications`)
            } else {
                const data = await response.json()
                setNotifications(data.notifications)
            }
        }catch(error){
            console.log(`An error occured fetching the notifications: ${error}.`)
        }
    }

    useEffect(() => {
        fetchNotifications(userId)
    }, [])

    if (notifications.length === 0) {
        return (
            <div className="space-y-4 flex flex-col">
                <div className="flex items-center justify-between rounded-lg">
                    <div className="flex items-center">
                    <span>No notifications</span>
                    </div>
                </div>
            </div>
        )
    }
    
    return (
            
        <div className="space-y-4 flex flex-col p-2">
        {notifications.map((notification) => (
          <div className="flex items-center justify-between bg-gray-700 p-3 rounded-lg">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mr-3">
                {notification.type === 'friendRequest' ? <User className="w-4 h-4 mr-1" /> :  notification.type === 'solvedQuestion' ? <Check className="w-4 h-4 mr-1" /> : notification.type === 'interview' ? <Headset className="w-4 h-4 mr-1" /> : null}
              </div>
              {notification.type !== 'friendRequest' && (
                <span>{notification.name}</span>
              )}
              {notification.type === 'friendRequest' && (
                  <AcceptRequestButton userId={userId} senderId={notification.id} />
              )}
            </div>
          </div>
        ))}
      </div>
           
    );
}
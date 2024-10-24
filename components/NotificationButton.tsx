import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Bell, Divide } from 'lucide-react';
import {useState} from 'react'

interface NotificationProps {
    id: string,
    name: string,
    time?: Date,
}

export default function NotificationButton({userId}: {userId: string}) {


    //based on the userid, fetch the notifications
    const [notifications, setNotifications] = useState<NotificationProps[]>([]);
    const fetchNotifications = async(userId: string) => {

        try{
            const response = await fetch(`/api/notifications?userId=${userId}`, {method: 'GET', body: JSON.stringify({limit: 10})})
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
    
    return (
        <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline"><Bell className="w-4 h-4" /></Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
       <div className="space-y-4 flex flex-col p-2">
            {notifications.map((notification) => (
                <div key={notification.id} className="flex items-center justify-between bg-gray-700 p-3 rounded-lg">
                    <div className="flex items-center">
                      <span>{notification.name}</span>
                    </div>
                </div>
            ))}
       </div>
      </PopoverContent>
    </Popover>
    );
}

import { useState } from 'react';
import { Button } from './ui/button';
import { UserPlus, Calendar, Check } from 'lucide-react';
import { User } from '@/lib/db/db';

interface UserListProp {
  user: User,
  userId: string,

}




export const Friends: React.FC<UserListProp> = ({user, userId}) => {

const [sent, setSent] = useState(false);
const onSubmit = async(userId: string, anotherUserId: string) => {
  const response = await fetch(`/api/teams?userId1=${userId}&userId2=${anotherUserId}`, {method: 'POST', body: JSON.stringify({id: 'test'})})
  if (!response.ok) {
    console.log(`An error occured adding the friend to the user`)
  } else{
    setSent(true)
  }
  const data = await response.json()
  console.log(`The data from the POST request is: ${data}`)
  
}
  
    return (
        <div>
            <div className="space-y-4 pb-2">
                  <div key={user?._id} className="flex items-center justify-between bg-gray-700 p-3 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mr-3">
                        {user.name[0]}
                      </div>
                      <span>{user?.name}</span>
                    </div>
                    <div className="space-x-2">
                      {sent ? <Button size="sm" className='bg-green-500 text-white' disabled><Check className="w-4 h-4 mr-1" />Sent!</Button> : <Button size="sm" variant="outline" onClick={() => onSubmit(userId, user?._id)}>
                        <UserPlus className="w-4 h-4 mr-1" />
                        Add Friend
                      </Button>}
                      <Button size="sm" variant="outline">
                        <Calendar className="w-4 h-4 mr-1" />
                        Schedule Interview
                      </Button>
                    </div>
                  </div>
                
              </div>
        </div>
    )
}
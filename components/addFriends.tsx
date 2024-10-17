
import { useState } from 'react';
import { Button } from './ui/button';
import { UserPlus, Calendar } from 'lucide-react';
import { User } from '@/lib/db/db';


interface UserListProp {
    users: User[],
    userId: string,

}

export const Friends: React.FC<UserListProp> = ({users, userId}) => {
    return (
        <div>
            <div className="space-y-4">
                {users.map((friend) => (
                  <div key={friend?._id} className="flex items-center justify-between bg-gray-700 p-3 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mr-3">
                        {friend.name[0]}
                      </div>
                      <span>{friend?.name}</span>
                    </div>
                    <div className="space-x-2">
                      <Button size="sm" variant="outline">
                        <UserPlus className="w-4 h-4 mr-1" />
                        Add Friend
                      </Button>
                      <Button size="sm" variant="outline">
                        <Calendar className="w-4 h-4 mr-1" />
                        Schedule Interview
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
        </div>
    )
}
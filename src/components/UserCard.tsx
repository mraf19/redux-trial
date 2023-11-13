import { useState } from 'react'
import { useAppDispatch } from '../store/hooks';
import { selectedUser, User } from "../store/slice/usersSlice";
import { Link } from 'react-router-dom';

interface UserCardProps {
  user: User
}

export default function UserCard({ user }: UserCardProps) { 
  const dispatch = useAppDispatch()
  const [clicked, setClicked] = useState(false)

  return (
    <div 
      className="w-full xl:w-1/2 2xl:xl:w-1/3 h-60 flex flex-col gap-6"
      onClick={() => setClicked(!clicked)}
    >
      <div className="w-full flex p-8 border border-slate-500 rounded-md shadow-lg hover:bg-gray-900 group hover:shadow-none hover:scale-105 hover:cursor-pointer transition-all">
        <div className="w-1/3 full flex flex-col justify-between items-start gap-2">
          <h2 className="text-xl text-slate-900 group-hover:text-white font-bold">{user.name}</h2>
          <p className="text-lg text-slate-500 group-hover:text-white ">{user.username}</p>
          <p className="text-lg text-slate-500 group-hover:text-white ">{user.email}</p>
        </div>
        <div className="w-2/3 flex justify-end gap-4 items-center">
          <div className="flex flex-col items-end gap-4">
            <p className="text-md text-slate-900 group-hover:text-white">{user.address.suite}, {user.address.street}</p>
            <p className="text-md text-slate-900 group-hover:text-white">{user.address.city}, {user.address.zipcode}</p>
          </div>
        </div>
      </div>

      {
        clicked && (
          <div className="w-full h-20 flex justify-center items-center gap-20 mb-4">
            <Link
              to={`/posts/${user.id}`}
              onClick={() => dispatch(selectedUser(user.id))}
              className='bg-emerald-700 px-8 py-2 text-white font-medium rounded-sm hover:scale-105 transition-all hover:bg-emerald-400' 
            >
              Posts
            </Link>
            <Link 
              to={`/activities/${user.id}`}
              onClick={() => dispatch(selectedUser(user.id))}
              className='bg-sky-700 px-8 py-2 text-white font-medium rounded-sm hover:scale-105 transition-all hover:bg-sky-400' 
            >
              Activity
            </Link>
          </div>
        )
      }
      
    </div>
  )
}
import { Activity } from "../store/slice/activitiesSlice"

interface ActivityCardProps {
  activity: Activity
}

export default function PostCard({ activity }: ActivityCardProps) {
  return (
    <div className="w-full md:w-1/2 xl:w-1/3 2xl:xl:w-1/4 flex flex-col p-8 gap-4 border border-slate-500 rounded-md shadow-lg hover:bg-gray-900 group hover:shadow-none hover:scale-105 hover:cursor-pointer transition-all">
      <h2
        className="text-xl text-slate-900 group-hover:text-white font-bold"
      >
        {activity.title}
      </h2>
      <p
        className={`text-lg ${activity.completed ? 'text-green-700' : 'text-yellow-700'} group-hover:text-white font-medium`}
      >
        {activity.completed ? 'Completed' : 'In Progress'}
      </p>
    </div>
  )
}
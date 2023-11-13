import { Comment } from "../store/slice/commentsSlice"

interface CommentCardProps {
  comment: Comment
}

export default function CommentCard({ comment }: CommentCardProps) {

  return (
    <div
      className="w-1/2 flex flex-col gap-10 p-8 border border-slate-500 rounded-md shadow-lg hover:bg-gray-900 group hover:shadow-none hover:scale-105 transition-all"
    >
      <div className="w-full flex justify-between items-center">
        <h2 className="text-xl text-slate-900 group-hover:text-white font-bold">{comment.name}</h2>
        <p className="text-lg text-slate-700 group-hover:text-white ">{comment.email}</p>
      </div>
      
      <p className="text-lg text-slate-500 group-hover:text-white ">{comment.body}</p>
    </div>
  )
}
import { Post } from "../store/slice/postsSlice"
import { Link } from 'react-router-dom'

interface PostCardProps {
  post: Post
}

export default function PostCard({post}: PostCardProps){

  return (
    <Link 
      to={`/comments/${post.id}`}
      className="w-full md:w-1/2 xl:w-1/3 2xl:xl:w-1/4 flex flex-col p-8 border border-slate-500 rounded-md shadow-lg hover:bg-gray-900 group hover:shadow-none hover:scale-105 hover:cursor-pointer transition-all"
    >
        <h2 className="text-xl text-slate-900 group-hover:text-white font-bold">{post.title}</h2>
        <p className="text-lg text-slate-500 group-hover:text-white ">{post.body}</p>
    </Link>
  )
}
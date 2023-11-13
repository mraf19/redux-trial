import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PostCard from '../components/PostCard'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { selectAllPosts, fetchPosts, Post, createPost } from '../store/slice/postsSlice'

export default function Posts() {
  const { id } = useParams()
  const posts = useAppSelector(selectAllPosts)
  const { status } = useAppSelector(state => state.posts)
  const dispatch = useAppDispatch()

  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [add, setAdd] = useState(false)

  const submit = ( ) => {
    const post : Post = {
      id: Number(new Date()),
      userId: Number(id),
      title,
      body
    }
    dispatch(createPost(post))
    setTitle('')
    setBody('')
    setAdd(false)
    dispatch(fetchPosts(id!))
  }

  useEffect(() => {
    dispatch(fetchPosts(id!))
  }, [dispatch, id])
  return (
    <div className="max-w-screen min-h-screen px-20 py-10">
      <div className="w-full min-h-[90vh] border border-slate-500 shadow-lg flex flex-col items-center rounded-md gap-14">
        <h1 className="mt-10 text-5xl font-bold">Post List by user #{id}</h1>
        <div className='w-full flex flex-col gap-6 px-40'>
          {
            status === 'success' ? (
              <h3
                className='text-xl font-semibold cursor-pointer hover:underline transition-all'
                onClick={() => setAdd(!add)}
              >
                Add Post
              </h3>
            ) : null
          }
          
          {
            add && (
              <form className={`w-full lg:w-1/2 2xl:w-1/3 flex flex-col gap-3`}>
                <div className='flex flex-col gap-2'>
                  <label
                    htmlFor="title"
                    className='text-lg font-medium'
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id='title'
                    name='title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className='text-lg font-medium border border-slate-500 rounded-md px-2 py-1'
                  />
                </div>
                <div className='flex flex-col gap-2'>
                  <label
                    htmlFor="body"
                    className='text-lg font-medium'
                  >
                    Body
                  </label>
                  <textarea
                    id='body'
                    name='body'
                    rows={5}
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    className='text-lg font-medium border border-slate-500 rounded-md px-2 py-1'
                  />
                </div>
                <button
                  type="button"
                  onClick={submit}
                  className='w-full lg:w-1/2 2xl:w-1/3 bg-emerald-700 px-8 py-2 text-center text-white font-medium rounded-lg hover:scale-105 transition-all hover:bg-emerald-400'
                >
                  Add
                </button>
              </form>
            )
          }
          
        </div>
        <div className='w-full flex justify-center items-center gap-4 flex-wrap mb-10'>
          {
            status === 'idle' ? (
              <div className="w-full h-full flex justify-center items-center">
                <h1 className="text-5xl font-bold">Loading...</h1>
              </div>
            ) : status === 'failed' ? (
              <div className="w-full h-full flex justify-center items-center">
                <h1 className="text-5xl font-bol text-red-600">Failed to fetch data</h1>
              </div>
              ) : posts?.length > 0 ? (
                posts?.map((post, index) => {
                  return <PostCard key={`post-${index}`} post={post} />
                })
              ) : (
                <div className="w-full h-full flex justify-center items-center">
                  <h1 className="text-5xl font-bol text-red-600">No Post for this user</h1>
                </div>
              )
          }
        </div>
      </div>
    </div>
  )
}
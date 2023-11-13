import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CommentCard from '../components/CommentCard'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { selectAllComments, fetchComments } from '../store/slice/commentsSlice'
import { useNavigate} from 'react-router-dom'

export default function Comments() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const { id } = useParams()
  const comments = useAppSelector(selectAllComments)
  const { status } = useAppSelector(state => state.comments)
  const { selectedUser } = useAppSelector(state => state.users)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if(!selectedUser) {
      navigate('/')
    }
    setLoading(true)
  }, [selectedUser, navigate])


  useEffect(() => {
    dispatch(fetchComments(id!))
  }, [dispatch, id])
  return (
    <div className="max-w-screen min-h-screen px-20 py-10">
      <div className="w-full min-h-[90vh] border border-slate-500 shadow-lg flex flex-col items-center rounded-md gap-10">
        {
          loading && (
            <h1 className={`mt-10 text-5xl font-bold transition-all`}>Comment List post #{id} by User #{selectedUser}</h1>
          )
        }
        
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
            ) : comments?.length > 0 ? (
              comments?.map((comment, index) => {
                return <CommentCard key={`comment-${index}`} comment={comment} />
              })
            ) : (
              <div className="w-full h-full flex justify-center items-center">
                <h1 className="text-5xl font-bol text-red-600">No Comment for this user</h1>
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}
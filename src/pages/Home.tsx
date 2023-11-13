import { useEffect } from 'react'
import UserCard from "../components/UserCard"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { fetchUsers, selectAllUsers } from "../store/slice/usersSlice"

function Home() {
  const users = useAppSelector(selectAllUsers)
  const { status } = useAppSelector(state => state.users)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  return (
    <div className="max-w-screen min-h-screen px-20 py-10">
      <div className="w-full min-h-[90vh] border border-slate-500 shadow-lg flex flex-col items-center rounded-md gap-4">
        <h1 className="mt-10 text-5xl font-bold">User List</h1>
        <div className='w-full flex  justify-center items-center gap-10 flex-wrap p-10'>
          {
            status === 'idle' ? (
              <div className="w-full h-full flex justify-center items-center">
                <h1 className="text-5xl font-bold">Loading...</h1>
              </div>
            ) : status === 'failed' ? (
              <div className="w-full h-full flex justify-center items-center">
                <h1 className="text-5xl font-bol text-red-600">Failed to fetch data</h1>
              </div>
              ) : users?.map((user, index) => {
                return <UserCard key={`user-${index}`} user={user} />
              })
          }
        </div>
      </div>
    </div>
  )
}

export default Home

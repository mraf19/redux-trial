import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ActivityCard from '../components/ActivityCard'
import { fetchActivities, selectAllActivities } from '../store/slice/activitiesSlice'
import { useAppDispatch, useAppSelector } from '../store/hooks'

export default function Activities() {
  const { id } = useParams()
  const activities = useAppSelector(selectAllActivities)
  const { status } = useAppSelector(state => state.activities)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchActivities(id!))
  }, [dispatch, id])
  return (
    <div className="max-w-screen min-h-screen px-20 py-10">
      <div className="w-full min-h-[90vh] border border-slate-500 shadow-lg flex flex-col items-center rounded-md gap-10">
        <h1 className="mt-10 text-5xl font-bold">Activity List by user #{id}</h1>
        <div className='w-full flex justify-center items-center gap-4 flex-wrap mb-10'>
          {
            status === 'idle' ? (
              <div className="w-full h-full flex justify-center items-center">
                <h1 className="text-5xl font-bold">Loading...</h1>
              </div>
            ): status === 'failed' ? (
                <div className="w-full h-full flex justify-center items-center">
                  <h1 className="text-5xl font-bol text-red-600">Failed to fetch data</h1>
                </div>
              ) : activities?.length > 0 ? (
                activities?.map((activity, index) => {
                  return <ActivityCard key={`activity-${index}`} activity={activity} />
                })
              ) : (
                <div className="w-full h-full flex justify-center items-center">
                  <h1 className="text-5xl font-bol text-red-600">No Activity for this User</h1>
                </div>
              )
          }
        </div>
      </div>
    </div>
  )
}
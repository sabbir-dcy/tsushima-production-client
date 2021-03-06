import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useQuery } from 'react-query'
import { axiosPrivate } from '../../api/axiosPrivate'
import { auth } from '../../firebase/firebase.init'
import MyOrderItem from './MyOrderItem'

const MyOrders = () => {
  const [user] = useAuthState(auth)
  const {
    data: items,
    isLoading,
    refetch,
  } = useQuery('myitems', () =>
    axiosPrivate(`/order?email=${user.email}`).then((res) => res.data)
  )
  if (isLoading) return
  return (
    <div className='overflow-x-auto'>
      <table className='min-w-max'>
        <thead>
          <tr className='bg-slate-200'>
            <th className='py-3 px-8 '>name</th>
            <th className='py-3 px-8 '>quantity</th>
            <th className='py-3 px-8 '>price</th>
            <th className='py-3 px-8 '>status</th>
            <th className='py-3 px-8 '>action/transaction id</th>
          </tr>
        </thead>
        <tbody>
          {items?.map((item) => (
            <MyOrderItem key={item._id} orderedItem={item} refetch={refetch} />
          ))}
        </tbody>
      </table>

    </div>
  )
}

export default MyOrders

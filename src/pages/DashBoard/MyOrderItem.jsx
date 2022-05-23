import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { axiosPrivate } from '../../api/axiosPrivate'
import Modal from '../../components/Modal'

const MyOrderItem = ({ orderedItem, refetch }) => {
  const { productName, totalPrice, productQuantity, paid, _id } = orderedItem
  const [cancel, setCancel] = useState(false)

  const handleCancelOrder = () => {
    if (!paid && cancel) {
      axiosPrivate.delete(`/order?id=${_id}`).then(() => {
        refetch()
        setCancel(false)
      })
    }
  }
  return (
    <>
      <div className='grid grid-cols-5 items-center justify-items-center even:bg-slate-100 p-3'>
        <h2>{productName}</h2>
        <h2>{productQuantity}</h2>
        <h2>$ {totalPrice}</h2>
        <span
          className={`${
            paid ? 'badge-success' : 'badge-danger'
          } text-center w-fit`}
        >
          {paid ? 'paid' : 'unpaid'}
        </span>
        <div className='space-x-2'>
          {!paid && (
            <Link
              className='bg-secondary cta text-white hover:bg-secondaryDark'
              to={`/payment/${_id}`}
            >
              Pay now
            </Link>
          )}
          <label
            onClick={() => setCancel(true)}
            htmlFor='my-modal-3'
            className='modal-button cta cta-danger w-fit cursor-pointer'
          >
            cancel
          </label>
        </div>
      </div>
      <Modal handleCancelOrder={handleCancelOrder}></Modal>
    </>
  )
}

export default MyOrderItem
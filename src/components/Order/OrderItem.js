import DeleteIcon from '@material-ui/icons/Delete'
import React, { useEffect, useState } from 'react'

function OrderItem ({ TotalPrice, Orderdetails, Status }) {
  return (
    <div className='row no-gutters py-2'>
      <div className='col-sm-2 p-2'>
        {/* <img
          alt={Name}
          style={{ margin: '0 auto', maxHeight: '50px' }}
          src={ImageUrl}
          className='img-fluid d-block'
        /> */}
      </div>
      <div className='col-sm-4 p-2'>
        {/* <h5 className='mb-1'>{Name}</h5> */}
        <p className='mb-1'>Price: {TotalPrice},000vnd </p>
      </div>
      <div className='col-sm-2 p-2 text-center '>
        <p className='mb-0'>Qty: {Orderdetails.length}</p>
      </div>
      <div className='col-sm-4 p-2 text-right'>
        {!Status && (
          <button
            // onClick={() => removeProduct(product)}
            className='btn btn-danger btn-sm mb-1'
          >
            <DeleteIcon width={'20px'} />
          </button>
        )}
      </div>
    </div>
  )
}

export default OrderItem

import React from 'react'

const BidCard = ({data}) => {
  
  return (
    <div className='border border-black m-2 p-2 rounded-lg'>
       <img src={data.itemImage} />
      <h1>Item Name: {data.itemName}</h1>
      <h1>Bidded Price: {data.bidAmount}</h1>
      <h1>Bidder Name: <b>{data.userName}</b> </h1>
    </div>
  )
}

export default BidCard

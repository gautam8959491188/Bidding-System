import React from 'react'

const CartCard = ({data}) => {
console.log(data[0].userName);
console.log(data[0].itemName);
console.log(data[0].userbidAmount)
console.log(data[0].image)

    
  return (
    <div>
    
    <div className='flex'>
  <div className='shadow-slate-700 shadow-sm rounded-lg p-5 h-auto w-auto mx-5 border border-black'>
  <img src={data[0].itemImage} className='w-50 h-50'/>
  <h1 className='font-bold'>Item Name: {data[0].itemName}</h1>
  <h1 >Bidded Price: {data[0].bidAmount}</h1>
  
  </div>
  </div> 
    </div>
  )
}

export default CartCard

import React from 'react'

const ShowInfo = ({itemInfo}) => {
    const acceptedRequest = () => {

        window.localStorage.setItem("requestedItem", itemInfo.itemName);
    
      //   fetch("http://localhost:5000/getRequestedItem",{
      //     method:"POST",
      //     crossDomain: true,
      //     headers:{
      //         "Content-Type" : "application/json",
      //         Accept: "application/json",
      //         "Access-Control-Allow-Origin": "*"
      //     },
      //     body: JSON.stringify({
      //     itemName: itemInfo.itemName,
      //     price: itemInfo.price,
      //     description: itemInfo.description,
      //     image: itemInfo.image,
      //     })
      // })
      // .then((res)=>res.json())
      // .then((data)=>{
      //   console.log(data, "requestedItemAddedToMainList");
      // })
    
    
        fetch("http://localhost:5000/requestedItemDelete",{
          method:"POST",
          crossDomain: true,
          headers:{
              "Content-Type" : "application/json",
              Accept: "application/json",
              "Access-Control-Allow-Origin": "*"
          },
          body: JSON.stringify({
          itemName: itemInfo.itemName,     
          })
      })
      .then((res)=>res.json())
      .then((data)=>{
        console.log(data, "requestedItemDeleted");
      })
        alert("Request accepted Successfully.")
        const info = window.localStorage.getItem("requestedItem");
        window.location.href="/userDetails"
      }

    const rejectedRequest = () => {
           fetch("http://localhost:5000/requestedItemDelete",{
          method:"POST",
          crossDomain: true,
          headers:{
              "Content-Type" : "application/json",
              Accept: "application/json",
              "Access-Control-Allow-Origin": "*"
          },
          body: JSON.stringify({
          itemName: itemInfo.itemName,     
          })
      })
      .then((res)=>res.json())
      .then((data)=>{
        console.log(data, "requestedItemDeleted");
      })
      alert("Request Rejected.")
      window.localStorage.clear("requestedItem");
      window.location.href="/UserDetails"
      }

  return (
<div className='flex'>
  <div className='shadow-slate-700 shadow-sm rounded-lg p-5 h-auto w-auto mx-5 border border-black'>
  <img src={itemInfo.image} className='w-50 h-50'/>
  <h1 className='font-bold'>Item Name: {itemInfo.itemName}</h1>
  <h1 >Asking Price: {itemInfo.price}</h1>
  <h1>Description: {itemInfo.description}</h1>
  <button onClick={()=>{acceptedRequest()}} className='mt-4 text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800'>Accept</button> 
  <button onClick={()=>{rejectedRequest()}} className='mt-4 text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900'>Reject</button>
  </div>
  </div> 


  )
}

export default ShowInfo

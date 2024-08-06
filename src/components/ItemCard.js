import React from 'react'

const ItemCard = ({itemData}) => {
    const deleteItem = (id,name) => {
        if(window.confirm(`Are You Sure you want to delete ${name}`))
            {
                fetch("http://localhost:5000/deleteItem",{
                    method:"POST",
                    crossDomain: true,
                    headers:{
                        "Content-Type" : "application/json",
                        Accept: "application/json",
                        "Access-Control-Allow-Origin": "*"
                    },
                    body: JSON.stringify({
                    itemid: id,     
                    })
                })
                .then((res)=>res.json())
                .then((data)=>{
                  alert(data.data);
                  window.location.href='./UserDetails';
                   
                });
            }else{

            }
    
    }
  return (
    <div className='flex'>
    <div className='shadow-slate-700 shadow-sm rounded-lg p-5 h-auto w-auto mx-5 border border-black'>
    <img src={itemData.image} className='w-50 h-50'/>
    <h1 className='font-bold'>Item Name: {itemData.itemName}</h1>
    <h1 >Price: {itemData.price}</h1>
    <h1>Description: {itemData.description}</h1>
    <button type="button" onClick={()=>{deleteItem(itemData._id, itemData.itemName)}} class="mt-5 text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>
    </div>
    </div>
  )
}

export default ItemCard

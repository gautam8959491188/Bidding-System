import React,{useEffect, useState} from 'react'
import { useDispatch } from 'react-redux'
import { setItem } from '../utils/itemSlice'
import { Link } from 'react-router-dom'


const UserItemCard = ({itemData}) => {
  const [start, setStart] = useState("");


  useEffect(()=>{
    const i = setInterval(()=>{
      fetch("http://localhost:5000/getStatus",{
        method:"POST",
        crossDomain: true,
        headers:{
            "Content-Type" : "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({
            bidStatus: true,
        })
    })
    .then((res)=>res.json())
    .then((data)=>{
      if(data.data == null)
      {
      console.log("Inside: "+ data.data);
      setStart(false);
      return;
    }
    else{
    setStart(true);
    }
    });
    
    },2000)

    return () => clearInterval(i)
  },[])
    const dispatch = useDispatch();
   

  
const itemDetails = (itemData) => {
 
    dispatch(setItem({
                   itemName: itemData.itemName,
                   price: itemData.price,
                   description: itemData.description,
                   image: itemData.image
               }))
}
  return (
    <div className='flex'>
    <div className='shadow-slate-700 shadow-sm rounded-lg p-5 h-auto w-auto mx-5 border border-black'>
    <img src={itemData.image} className='w-50 h-50'/>
    <h1 className='font-bold'>Item Name: {itemData.itemName}</h1>
    <h1 >Asking Price: {itemData.price}</h1>
    <h1>Description: {itemData.description}</h1>
  
    {

        start?<Link to="/BidPage"><button type="button" onClick={()=>{itemDetails(itemData)}} class="mt-5 text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900">Bid</button></Link>:
        <h1>Bid yet to start</h1>
    }
  
        

    </div>
    </div>
  )
}

export default UserItemCard

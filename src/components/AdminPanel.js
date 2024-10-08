import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import ItemCard from './ItemCard';


const AdminPanel = () => {
  const [itemData, setItemData] = useState([]);   
 

    const logout = () => {
        window.localStorage.clear();
        window.location.href='./'
    }

    useEffect(()=>{
      getAllItem();
    },[])

    const startBid = () =>{
      
      fetch("http://localhost:5000/setStatus",{
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
        console.log(data.data.status)
    });
      alert("Bid Started");
      

    }
const getAllItem = () => {
  
  fetch("http://localhost:5000/getAllItem",{
    method:"GET"
})
.then((res)=>res.json())
.then((data)=>{
    console.log(data, "itemData");
    setItemData(data.data);
    console.log(itemData)
  
});

}
  return (
    <div>
    <div >
      <center><h1 className='mt-2 font-serif font-bold text-3xl'>Welcome Admin</h1></center>
      
      <ul className='flex space-x-5 ml-[470px] mt-5 mb-5'>
       <li><Link to="/UserList"><button className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Show Users</button></Link></li>
       <li><Link to="/AddItem"><button className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Add Item</button></Link></li>
      
      <li><Link to="/LeaderBoard"><button className='text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>Leader Board</button></Link></li>
      <li><button onClick={()=>{startBid()}} className='text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>Start Bid</button></li>
      </ul>
      
        
      
      
      </div>
      <div className='flex'>
       
      
      {
      itemData.map(item=> <ItemCard itemData={item} />)
      }
      </div>

      <center><button className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900 mt-5" onClick={()=>{logout()}}>Log Out</button></center>
    </div>
  )
}

export default AdminPanel

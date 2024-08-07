import React, {useState, useEffect, useContext} from 'react'
import UserItemCard from './UserItemCard';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../utils/userSlice';
import RequestSection from './RequestSection';

const ShowDetails = ({data}) => {
  const [itemData, setItemData] = useState([]);    
  const [showRequest, setShowRequest] = useState(false);
  const [requestData, setRequestData] = useState({});
  const [itemName, setItemName] = useState("");
  const [itemInfo, setItemInfo] = useState({});
  const [showMessage, setShowMessage] = useState(false);


    const logout = () => {
        window.localStorage.clear();
        window.location.href='./'
    }

    useEffect(()=>{
     
      getAllItem();
     
    },[])
    const dispatch = useDispatch();
    dispatch(setUserInfo({
      userName: data.userName
    }));


    const getAllItem = () => {
      const item = window.localStorage.getItem("item");
      fetch("http://localhost:5000/requestedItemData",{
        method:"POST",
        crossDomain: true,
        headers:{
            "Content-Type" : "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({
        itemName:  item,   
        })
    })
    .then((res)=>res.json())
    .then((data)=>{
      console.log(data, "requestedItemInfoInside");
      if(data.data == null)
      {
        setShowMessage(true);
        return;
      }
      setItemData(data.data)
      
   });
    }

    



  return (
    <>
    
    <div className='border border-black'>
      
      <img src='https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png' className='h-12 mt-2 ml-[1100px]'/>
      
    <div className='ml-[1090px] mt-2 p-2'>
      
      <h1>Name: <b>{data.userName}</b></h1>
      <h1>Email: <b>{data.email}</b></h1>

    </div>
    <center><h1 class="mb-2 text-2xl font-extrabold dark:text-white">Items<span class="bg-blue-100 text-blue-800 text-xl font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-2">List</span></h1></center>
    </div>
    <button className='border border-black m-2 p-1' onClick={()=>{setShowRequest(true)}}>Show Bid Requests</button>

    { showRequest? <div>
      {
        <div>
            <RequestSection data={data}/>
         </div>     
      }
      <button className='border border-black m-2 p-1' onClick={()=>{setShowRequest(false)}}>Home</button></div>:

        <div>
        {
          showMessage? <h1>No Data to Present.</h1> :
            <UserItemCard itemData={itemData} />
        }
        </div>






    }
    
    <center><button className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900" onClick={()=>{logout()}}>Log Out</button></center>
  
    </>
    
  )
}

export default ShowDetails

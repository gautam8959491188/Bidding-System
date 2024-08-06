import React, {useState, useEffect, useContext} from 'react'
import UserItemCard from './UserItemCard';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../utils/userSlice';
import UserContext from '../utils/UserContext';

const ShowDetails = ({data}) => {
  const [itemData, setItemData] = useState([]);    
  const {user} = useContext(UserContext);


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
    <>
    <div className='border border-black'>
      
      <img src='https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png' className='h-12 mt-2 ml-[1100px]'/>
      
    <div className='ml-[1090px] mt-2 p-2'>
      
      <h1>Name: <b>{data.userName}</b></h1>
      <h1>Email: <b>{data.email}</b></h1>

    </div>
    <center><h1 class="mb-2 text-2xl font-extrabold dark:text-white">Items<span class="bg-blue-100 text-blue-800 text-xl font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-2">List</span></h1></center>
    </div>
    <div className='flex p-2 m-2'>
      
      {
      itemData.map(item=> <UserItemCard itemData={item} />)
      }
      </div>
    <center><button className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900" onClick={()=>{logout()}}>Log Out</button></center>
  
    </>
    
  )
}

export default ShowDetails

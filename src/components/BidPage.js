import React, {useContext, useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BidPane from './BidPane';
import { setBids } from '../utils/bidSlice';
import { setLBids } from '../utils/largestBidSlice';
import { Link } from 'react-router-dom';
import ShowResults from './ShowResults';


const BidPage = () => {
    

    const items = useSelector(store=> store.item.items)
    const [bid, setBid] = useState(0);
    const user1 = useSelector(store=> store.user.userInfo)
    const [userBid, setUserBid] = useState([]);
    const [askingPrice, setAskingPrice] = useState(items.price);
    const dispatch = useDispatch();
    const [timer, setTimer] = useState(30);
    const [showWinner, setShowWinner] = useState(false);
    const [showTimer, setShowTimer] = useState(true)
    

    useEffect(()=>{
        const i = setInterval(()=>{
            window.localStorage.setItem("timer", timer);
            if(timer == 0)
            {
                alert("Timers Up, Bid Over.");
                setShowWinner(true);
                setShowTimer(false);
                clearInterval(i)

            }
            var time = window.localStorage.getItem("timer");
            -- time;
            setTimer(time);
           
            window.localStorage.clear("timer");
        },1000)

        return ()=> clearInterval(i);
    })
 

    useEffect(()=>{
        const i = setInterval(async ()=>{ 
            fetch("http://localhost:5000/getItemBid",{
                method:"POST",
                crossDomain: true,
                headers:{
                    "Content-Type" : "application/json",
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify({
                    itemName: items.itemName
                })
            })
            .then((res)=>res.json())
            .then((data)=>{
                
                setUserBid(data.data)
            });
            fetch("http://localhost:5000/getLargestBid",{
                method:"POST",
                crossDomain: true,
                headers:{
                    "Content-Type" : "application/json",
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify({
                    itemName: items.itemName,
                })
            })
            .then((res)=>res.json())
            .then((data)=>{
                
                setAskingPrice(data.data.bidAmount);
                
            });


    },5000)

    return ()=> clearInterval(i)
    },[])

    const logout = () => {
        window.localStorage.clear();
        window.location.href='./'
    }

    
    window.localStorage.setItem("winningItem", items.itemName)

  return (
    <>
  <div className='flex'>
  <div className='border border-black w-1/2 h-auto p-2 m-5'>
    <img src={items.image} />
    <h1 className='mt-5'>Name: {items.itemName}</h1>
    <h1>Asking Price: {items.price}</h1>
    <h1>Description: {items.description}</h1>
    </div>
    <div>
    <div className='w-96 ml-52 h-[400px] mt-4 p-2 border border-black bg-slate-100 rounded-lg overflow-y-scroll flex flex-col-reverse'>
      {

     userBid.map((bid)=>(<BidPane bid={bid} />))
        
        }
   
    </div>
    <form className=' border border-black p-2 w-96 ml-52 mt-2 rounded-lg' onSubmit={(e)=>{
        e.preventDefault(); 
        setBid(0);
        if(bid <= askingPrice)
        {
            alert("Bid must be higher. Last bid was "+askingPrice)
            return;
        }
         else{
            dispatch(setBids({
             bidderName : user1.userName,
             biddingAmount: bid,
             biddingItem: items.itemName
            }))
            dispatch(setLBids({
                bigBid: bid,
            }))
         
            fetch("http://localhost:5000/addBid",{
                method:"POST",
                crossDomain: true,
                headers:{
                    "Content-Type" : "application/json",
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify({
                    userName: user1.userName,
                    bidAmount: bid,
                    itemName: items.itemName,
                 
                })
            })
            .then((res)=>res.json())
            .then((data)=>{
             console.log(data, "bidSend");
            });
            

            fetch("http://localhost:5000/largestBid",{
                method:"POST",
                crossDomain: true,
                headers:{
                    "Content-Type" : "application/json",
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify({
                    userName: user1.userName,
                    bidAmount: bid,
                    itemName: items.itemName,
                    itemImage: items.image
                })
            })
            .then((res)=>res.json())
            .then((data)=>{
                console.log(data, "largestBidSend");
            });
        }
    }}>
        <input type='text' value={bid} onChange={(e)=>{
            setBid(e.target.value);
        }} className='border border-black rounded-sm p-1 lg:w-3/4 xl:w-72'/> 
        <button className='bg-green-100 m-1 p-2 w-20 font font-bold lg:w-1/12 lg:text-sm xl:w-2/12 xl: text-sm'>Bid</button>
    </form>
    </div>         
    
    
    </div>
    <center><button className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900" onClick={()=>{logout()}}>Log Out</button></center>
    {
        showTimer? <center><span>Timer: <b>{timer}</b></span></center>: null
         
    }
   

    {
        showWinner?<ShowResults />:null
    }
    </>
  )
}

export default BidPage

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import BidCard from './BidCard';



const LeaderBoard = () => {

  const [bidData, setBidData] = useState([]);

  useEffect(()=>{
    getAllBids();
    },[]);

    const getAllBids = () => {
       
          fetch("http://localhost:5000/getAllLargestBid",{
              method:"GET"
          })
          .then((res)=>res.json())
          .then((data)=>{
              console.log(data, "userData");
              setBidData(data.data);
          });
    }



  return (
    <div>
      Leader Board. <br />
{
    
      bidData.map((bid)=> <BidCard data={bid} />)
    }
      <Link to="/UserDetails"><button className='border border-black'>Home</button></Link>
  
    </div>
  )
}

export default LeaderBoard

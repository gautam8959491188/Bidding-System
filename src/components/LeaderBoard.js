import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../utils/UserContext'
import { useSelector } from 'react-redux'


const LeaderBoard = () => {
  const items = useSelector(store=> store.item.items)
  const bigBid = useSelector(store=> store.lbid.bidInfo); 
  console.log(items.itemName);
  return (
    <div>
      Leader Board. <br />
      <Link to="/UserDetails"><button className='border border-black'>Home</button></Link>
      <span>Big Bid: {bigBid.bigBid}</span>
  
    </div>
  )
}

export default LeaderBoard

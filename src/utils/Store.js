import { configureStore } from "@reduxjs/toolkit";
import itemSlice from "./itemSlice";
import userSlice from "./userSlice";
import bidSlice from "./bidSlice";
import largestBidSlice from "./largestBidSlice.js";


const store = configureStore({
    reducer:{
        lbid: largestBidSlice,
        item: itemSlice,
        user: userSlice,
        bid: bidSlice,
        
       
    }
});

export default store;

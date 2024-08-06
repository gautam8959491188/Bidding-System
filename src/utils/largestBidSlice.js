import { createSlice } from "@reduxjs/toolkit";

const largestBidSlice = createSlice({
    name: "lbid",
    initialState: {
        bidInfo: 0
    },  
    reducers: {
        setLBids: (state,action)=>{
            state.bidInfo = action.payload;
        },
    }
});

export const {setLBids} = largestBidSlice.actions;
export default largestBidSlice.reducer;
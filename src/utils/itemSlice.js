import { createSlice } from "@reduxjs/toolkit";

const itemSlice = createSlice({
    name: "item",
    initialState: {
        items: {}
    },

    reducers:{
            setItem: (state, action)=>{
                state.items = action.payload;
            },
    }
});

export const {setItem} = itemSlice.actions;
export default itemSlice.reducer;

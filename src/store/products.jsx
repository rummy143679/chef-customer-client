import { createSlice } from "@reduxjs/toolkit";


const productSlice = createSlice({
    name:"Products",
    initialState:{
        allProducts: [],
    },
    reducers: {
        addProduct: (state, action) => {
            console.log(state);
            console.log(action.type);
            console.log(action.payload);
        }
    }
})

export const {addProduct} = productSlice.actions;
export default productSlice.reducer;
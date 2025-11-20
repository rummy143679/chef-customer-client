import { configureStore } from "@reduxjs/toolkit";
import authSlicer from "../store/authstore"
import productSlice from "../store/products"


const store = configureStore({
    reducer : {
        auth : authSlicer,
        products : productSlice
    }
})

export default store;
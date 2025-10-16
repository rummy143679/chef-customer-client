import { configureStore } from "@reduxjs/toolkit";
import authSlicer from "../store/authstore"


const store = configureStore({
    reducer : {
        auth : authSlicer
    }
})

export default store;
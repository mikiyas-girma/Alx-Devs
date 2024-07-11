import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import projectReducer from "./projectSlice";


const store = configureStore({
    reducer: {
        user: userReducer,
        projects: projectReducer,
    },
});


export default store;

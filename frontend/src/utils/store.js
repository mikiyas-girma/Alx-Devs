import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import projectReducer from "./projectSlice";
import userprojectSlice from "./userprojectSlice";


const store = configureStore({
    reducer: {
        user: userReducer,
        projects: projectReducer,
        userProjects: userprojectSlice,
    },
});


export default store;

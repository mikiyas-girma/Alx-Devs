import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import projectReducer from "./projectSlice";
import teamReducer from "./teamSlice";


const store = configureStore({
    reducer: {
        user: userReducer,
        projects: projectReducer,
        team: teamReducer,
    },
});


export default store;

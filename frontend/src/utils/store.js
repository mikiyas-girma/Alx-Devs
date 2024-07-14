import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import projectReducer from "./projectSlice";
import userProjectReducer from "./userprojectSlice";
import teamReducer from "./teamSlice";


const store = configureStore({
    reducer: {
        user: userReducer,
        projects: projectReducer,
        userProjects: userProjectReducer,
        team: teamReducer,
    },
});


export default store;

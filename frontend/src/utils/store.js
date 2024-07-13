import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import projectReducer from "./projectSlice";
import userprojectSlice from "./userprojectSlice";
import teamSlice from "./teamSlice";


const store = configureStore({
    reducer: {
        user: userReducer,
        projects: projectReducer,
        userProjects: userprojectSlice,
        teams: teamSlice,
    },
});


export default store;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "./axiosInstance";
import { getCookie } from "./utilities";


const initialState = {
    userProjects: [],
    teams: [],
    application_status: 'idle',
    form_status: null,
};



const userProjectReducer = createSlice({
    name: 'userProjects',
    initialState,

    reducers: { },

    extraReducers: (builder) => {
    }
});


export default userProjectReducer.reducer;

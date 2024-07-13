import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "./axiosInstance";

const storedUser = localStorage.getItem('user');
const initialState = {
    loggeduser: storedUser ? JSON.parse(storedUser) : null, 
    users: [],
    
};


export const fetchUserById = createAsyncThunk('/users/fetchUserById', async (id) => {
    const response = await axiosInstance.get(`/users/${id}`);
    return response.data;
});


export const fetchUsers = createAsyncThunk('/users/fetchUsers', async () => {
    const response = await axiosInstance.get('/users');
    return response.data;
}
);


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserLogin: (state, action) => {
            const { id, username, email, name, bio,  phone, github, image, skills, team_count} = action.payload;
            const userData = {id, username, email, name, skills, team_count, bio,  phone, github, image}

            state.loggeduser = userData;
            localStorage.setItem('user', JSON.stringify(userData));
        },
        setSignOut: (state) => {
            state.loggeduser = null;
            localStorage.removeItem('user');
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchUserById.fulfilled, (state, action) => {
                state.users.push(action.payload);
            });
    },
});


export const { setUserLogin, setSignOut } = userSlice.actions;
export default userSlice.reducer;

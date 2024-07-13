import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "./axiosInstance";
import { getCookie } from "./utilities";


const initialState = {
    userProjects: [],
    teams: [],
    application_status: 'idle',
    form_status: null,
};


export const askToJoinProject = createAsyncThunk('userProjects/askToJoinProject', async (data, {rejectWithValue}) => {
    try {
        const response = await axiosInstance.post(`/projects/${data.project_id}/join`, data, {
            headers: {
                'X-CSRF-Token': getCookie('csrf_access_token')
            }
        });
        
        return response.data;
    } catch (error) {
        console.log(error.response.data);

        return rejectWithValue(error.response.data);
    }
}
);


const userProjectSlice = createSlice({
    name: 'userProjects',
    initialState,

    reducers: { },

    extraReducers: (builder) => {
        builder
        .addCase(askToJoinProject.fulfilled, (state, action) => {
            state.application_status = 'succeeded';
            state.userProjects.push(action.payload);
        })
        
        .addCase(askToJoinProject.rejected, (state, action) => {
            state.application_status = 'failed';
            state.form_status = 'You already applied to this project'
            console.log(state.application_status);
        });
    }
});


export default userProjectSlice.reducer;

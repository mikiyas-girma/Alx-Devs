import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "./axiosInstance";
import { getCookie } from "./utilities";


const initialState = {
    userProjects: [],
    application_status: 'idle',
    form_status: null,
    error: null,
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
        return rejectWithValue(error.response.data);
    }
}
);


const userProjectSlice = createSlice({
    name: 'userProjects',
    initialState,

    reducers: {
    },

    extraReducers: (builder) => {
        builder
            .addCase(askToJoinProject.pending, (state) => {
                state.application_status = 'loading';
            })
            .addCase(askToJoinProject.fulfilled, (state, action) => {
                state.application_status = 'succeeded';
                state.userProjects = action.payload;
                state.form_status = action.payload.msg;
            })
            .addCase(askToJoinProject.rejected, (state, action) => {
                state.application_status = 'failed';
                state.error = action.error.message;
                state.form_status = action.payload.msg;
            });
    }
});


export default userProjectSlice.reducer;

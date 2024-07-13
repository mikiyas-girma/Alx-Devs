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

export const getTeam = createAsyncThunk('/user_projects/Team', async (data, {rejectWithValue}) => {
    try {
        const response = await axiosInstance.get(`/user_projects/${data.project_id}/team`, {
            headers: {
                'X-CSRF-Token': getCookie('csrf_access_token')
            }
        });

        if (response.status === 200) {
            return response.data;
        }
        
        if (response.status === 401) {
            return rejectWithValue(response.data);
        }
       
    }
    catch (error) {
        return rejectWithValue(error.response.data);
    }
});


const userProjectSlice = createSlice({
    name: 'userProjects',
    initialState,

    reducers: {
        setApplicationStatus: (state, action) => {
            state.application_status = action.payload;
        },

        setFormStatus: (state, action) => {
            state.form_status = action.payload;
        },

        setFormError: (state, action) => {
            state.form_error = action.payload;
        },
    },

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
        })
        
        .addCase(getTeam.fulfilled, (state, action) => {
            state.teams = action.payload;
        })
        
        .addCase(getTeam.rejected, (state, action) => {
                state.error = action.payload;
            });
    }
});


export const { setApplicationStatus, setFormStatus, setFormError } = userProjectSlice.actions;
export default userProjectSlice.reducer;

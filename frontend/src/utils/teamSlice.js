import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "./axiosInstance";
import { getCookie } from "./utilities";


const initialState = {
    team: [],
    team_status: 'idle',
    team_error: null,
};


export const fetchTeam = createAsyncThunk('/user_projects/Team', async (project_id, {rejectWithValue}) => {
    try {
        const response = await axiosInstance.get(`/user_projects/${project_id}/team`, {
            headers: {
                'X-CSRF-Token': getCookie('csrf_access_token')
            }
        });
        console.log("team :  ", response.data)
        return response.data;
    }
    catch (error) {
        return rejectWithValue(error.response.data);
    }
});


export const addTeamMember = createAsyncThunk('/user_projects/AddTeamMember', async (data, {rejectWithValue}) => {
    console.log("as payload: ",  data)
    const response = await axiosInstance.post(`/projects/${data.project_id}/join`, data, {
        headers: {
            'X-CSRF-Token': getCookie('csrf_access_token')
        }
    });
    return data;
});



const teamSlice = createSlice({
    name: 'team',
    initialState,

    reducers: { },

    extraReducers: (builder) => {
        builder
        .addCase(fetchTeam.pending, (state) => {
            state.team_status = 'loading';
        })
        .addCase(fetchTeam.fulfilled, (state, action) => {
            state.team_status = 'succeeded';
            state.team = action.payload;
        })
        
        .addCase(fetchTeam.rejected, (state, action) => {
            state.team_status = 'failed';
            state.team_error = action.error.message;
        })
        .addCase(addTeamMember.pending, (state) => {
            state.team_status = 'loading';
        })
        .addCase(addTeamMember.fulfilled, (state, action) => {
            if (action.payload) {
                console.log("action to be added", action.payload)
                state.team.push(action.payload);
            } else {
                console.log("domino uu", action.payload)
            }
        })
        .addCase(addTeamMember.rejected, (state, action) => {
            state.team_status = 'failed';
            state.team_error = action.error.message;
        });
    }
});


export default teamSlice.reducer;

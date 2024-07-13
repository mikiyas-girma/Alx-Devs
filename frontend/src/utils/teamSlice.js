import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "./axiosInstance";
import { getCookie } from "./utilities";


const initialState = {
    teams: {},
    teamDetails: [],
    application_status: 'idle',
    form_status: null,
};


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


const teamSlice = createSlice({
    name: 'teams',
    initialState,

    reducers: {
        setApplicationStatus: (state, action) => {
            state.application_status = action.payload;
        },

        setFormStatus: (state, action) => {
            state.form_status = action.payload;
        },
        addApplicantToTeam: (state, action) => {
            const { project_id, user } = action.payload;
            const team = state.teams[project_id]?.team || [];
            const team_members = state.teams[project_id]?.team_members || [];

            team.push(user);
            team_members[user.user_id] = user.userDetails;

            state.teams[project_id] = {
                team: team,
                team_members: team_members
            };
        }
    },

    extraReducers: (builder) => {
        builder
        .addCase(getTeam.fulfilled, (state, action) => {
            state.application_status = 'succeeded';
            const { team, team_members } = action.payload;
            state.teams[action.meta.arg.project_id] = {
                team: team,
                team_members: team_members,
            };
        })
        
        .addCase(getTeam.rejected, (state, action) => {
            state.application_status = 'failed';
            state.form_status = 'You already applied to this project';
        })
    }
});


export const { addApplicantToTeam } = teamSlice.actions;
export default teamSlice.reducer;

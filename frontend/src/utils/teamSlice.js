import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "./axiosInstance";
import { getCookie } from "./utilities";



export const fetchTeam = createAsyncThunk('/projects/Team', async (project_id, {rejectWithValue}) => {
    try {
        const response = await axiosInstance.get(`/projects/${project_id}/team`, {
            headers: {
                'X-CSRF-Token': getCookie('csrf_access_token')
            }
        });

        return response.data;
        
    }
    catch (error) {
        return rejectWithValue(error.response.data);
    }
});


export const approveApplicant = createAsyncThunk('/user_projects/approve', async(user_project_id, {rejectWithValue}) => {
    try {
        console.log("user_project_id: ", user_project_id)
        console.log("csrf: ", getCookie('csrf_access_token'))
        const response = await axiosInstance.patch(`/user_projects/${user_project_id}/approve`, {}, {
            headers: {
                'X-CSRF-Token': getCookie('csrf_access_token')
            }
        });

        return response.data;

    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});


export const rejectApplicant = createAsyncThunk('/user_projects/reject', async(user_project_id, {rejectWithValue}) => {
    try {
        const response = await axiosInstance.delete(`/user_projects/${user_project_id}/reject`, {
            headers: {
                'X-CSRF-Token': getCookie('csrf_access_token')
            }
        });

        return response.data;

    } catch (error) {
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


export const fetchMyRequests = createAsyncThunk('/my_requests', async () => {
    try {
        const response = await axiosInstance.get(`/my_requests`, {
            headers: {
                'X-CSRF-Token': getCookie('csrf_access_token')
            }
        });

        return response.data;

    } catch (error) {
        return error.response.data;
    }
});


export const leaveTeam = createAsyncThunk('/projects/leave', async (project_id, {rejectWithValue}) => {
    try {
        const response = await axiosInstance.post(`/projects/${project_id}/leave`, {},  {
            headers: {
                'X-CSRF-Token': getCookie('csrf_access_token')
            }
        });

        return response.data.project_id;

    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});




const initialState = {
    team: [],
    my_requests: [],
    team_status: 'idle',
    team_error: null,
};


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
                state.team.push(action.payload);
            }
        })
        .addCase(addTeamMember.rejected, (state, action) => {
            state.team_status = 'failed';
            state.team_error = action.error.message;
        })
        .addCase(approveApplicant.pending, (state) => {
            state.team_status = 'loading';
        })
        .addCase(approveApplicant.fulfilled, (state, action) => {
            state.team_status = 'succeeded';
            state.team = action.payload.team;
        })
        .addCase(rejectApplicant.fulfilled, (state, action) => {
            state.team_status = 'succeeded';
            state.team = action.payload.team;
        })
        .addCase(fetchMyRequests.pending, (state) => {
            state.team_status = 'loading';
        })
        .addCase(fetchMyRequests.fulfilled, (state, action) => {
            state.team_status = 'succeeded';
            state.my_requests = action.payload;
        })
        .addCase(leaveTeam.pending, (state) => {
            state.team_status = 'loading';
        })
        .addCase(leaveTeam.fulfilled, (state, action) => {
            state.team_status = 'succeeded';
            state.my_requests = state.my_requests.filter((request) => request.project_id !== action.payload);
        })
        
    }
});


export default teamSlice.reducer;

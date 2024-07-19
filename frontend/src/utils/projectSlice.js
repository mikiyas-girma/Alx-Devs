import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "./axiosInstance";
import { getCookie } from "./utilities";


const initialState = {
    projects: [],
    currentProject: null,
    myProjects: [],
    status: 'idle',
    error: null,
};


export const fetchProjects = createAsyncThunk('projects/fetchProjects', async () => {
    const response = await axiosInstance.get('/projects');
    return response.data
});

export const fetchProjectById = createAsyncThunk('projects/fetchProjectById', async (id) => {
    const response = await axiosInstance.get(`/projects/${id}`);
    return response.data;
});


export const addProject = createAsyncThunk('project/addProject', async (newProject) => {
    const response = await axiosInstance.post('/projects/', newProject, {
        headers: {
            'X-CSRF-Token': getCookie('csrf_access_token')
        }
    });
    console.log(response.data);
    return response.data.project;
});


export const updateProject = createAsyncThunk('project/updateProject', async (project) => {
    const response = await axiosInstance.patch(`/projects/${project.id}`, project, {
        headers: {
            'X-CSRF-Token': getCookie('csrf_access_token')
        }
    });
    return response.data.project;
});


const projectSlice = createSlice({
    name: 'projects',
    initialState,

    reducers: {
        setCurrentProject: (state, action) => {
            state.currentProject = action.payload;
        },
        filterMyProjects: (state, action) => {
            const userId = action.payload
            state.myProjects = state.projects.filter(project => project.creator_id === userId);
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchProjects.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProjects.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.projects = action.payload;
            })
            .addCase(fetchProjects.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message;
            })
            .addCase(fetchProjectById.fulfilled, (state, action) => {
                state.currentProject = action.payload;
            })
            .addCase(addProject.fulfilled, (state, action) => {
                state.projects.push(action.payload);
            })
            .addCase(updateProject.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateProject.fulfilled, (state, action) => {
                const index = state.projects.findIndex(project => project.id === action.payload.id);
                state.projects[index] = action.payload;
                state.currentProject = action.payload;
                state.status = 'succeeded';
            })
            .addCase(updateProject.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }, 
});


export const { setCurrentProject, filterMyProjects } = projectSlice.actions;
export default projectSlice.reducer

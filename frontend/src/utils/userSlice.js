import { createSlice } from "@reduxjs/toolkit";

const storedUser = localStorage.getItem('user');
const initialState = {
    user: storedUser ? JSON.parse(storedUser) : null,
};


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserLogin: (state, action) => {
            const { id, username, email, name, skills, team_count} = action.payload;
            const userData = {id, username, email, name, skills, team_count}

            state.user = userData;
            localStorage.setItem('user', JSON.stringify(userData));
        },
        setSignOut: (state) => {
            state.user = null;
            localStorage.removeItem('user');
        },
    },
});


export const { setUserLogin, setSignOut } = userSlice.actions;
export default userSlice.reducer;

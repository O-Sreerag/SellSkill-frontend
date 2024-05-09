// redux/slices/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface userState {
    isAuthenticated: boolean;
    userEmail: string;
    userName: string;
    userImage: string;
    userRole: string;
}

const initialState: userState = {
    isAuthenticated: false,
    userEmail: "",
    userName: "",
    userImage: "",
    userRole: "",
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userLogin: (state, action: PayloadAction<{ isAuthenticated: boolean; userEmail: string; userName: string, userImage: string, userRole: string }>) => {
            state.isAuthenticated = action.payload.isAuthenticated;
            state.userEmail = action.payload.userEmail;
            state.userName = action.payload.userName;
            state.userImage = action.payload.userImage;
            state.userRole = action.payload.userRole;
        },
        userLogout: (state) => {
            state.isAuthenticated = false;
            state.userEmail = "";
            state.userName = "";
            state.userImage = "";
            state.userRole = "";
        },
    },
});

export const { userLogin, userLogout } = userSlice.actions;
export default userSlice.reducer;
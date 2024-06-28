// redux/slices/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface userState {
    isAuthenticated: boolean;
    userEmail: string;
    userName: string;
    userImage: string;
    userRole: string;
    userProfile: any;
    isBlocked: boolean;
}

const initialState: userState = {
    isAuthenticated: false,
    userEmail: "",
    userName: "",
    userImage: "",
    userRole: "",
    userProfile: {},
    isBlocked: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userLogin: (state, action: PayloadAction<{ isAuthenticated: boolean; userEmail: string; userName: string, userImage: string, userRole: string, userProfile: any, isBlocked: boolean, }>) => {
            state.isAuthenticated = action.payload.isAuthenticated;
            state.userEmail = action.payload.userEmail;
            state.userName = action.payload.userName;
            state.userImage = action.payload.userImage;
            state.userRole = action.payload.userRole;
            state.userProfile = action.payload.userProfile;
            state.isBlocked = action.payload.isBlocked;
        },
        userLogout: (state) => {
            state.isAuthenticated = false;
            state.userEmail = "";
            state.userName = "";
            state.userImage = "";
            state.userRole = "";
            state.userProfile = {};
            state.isBlocked = false;
        },
        updateUserProfile: (state, action: PayloadAction<any>) => {
            state.userProfile = action.payload;
        },
    },
});

export const { userLogin, userLogout, updateUserProfile } = userSlice.actions;
export default userSlice.reducer;
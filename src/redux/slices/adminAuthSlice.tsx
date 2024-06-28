// redux/slices/adminSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface adminState {
    isAuthenticated: boolean;
    adminEmail: string;
}

const initialState: adminState = {
    isAuthenticated: false,
    adminEmail: "",
};

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        adminLogin: (state, action: PayloadAction<{ isAuthenticated: boolean; adminEmail: string; }>) => {
            state.isAuthenticated = action.payload.isAuthenticated;
            state.adminEmail = action.payload.adminEmail;
        },
        adminLogout: (state) => {
            state.isAuthenticated = false;
            state.adminEmail = "";
        },
    },
});

export const { adminLogin, adminLogout } = adminSlice.actions;
export default adminSlice.reducer;
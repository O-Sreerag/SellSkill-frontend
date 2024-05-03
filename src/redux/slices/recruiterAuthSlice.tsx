// redux/slices/recruiterSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface recruiterState {
    isAuthenticated: boolean;
    recruiterEmail: string;
    recruiterName: string;
    recruiterImage: string;
}

const initialState: recruiterState = {
    isAuthenticated: false,
    recruiterEmail: "",
    recruiterName: "",
    recruiterImage: "",
};

const recruiterSlice = createSlice({
    name: 'recruiter',
    initialState,
    reducers: {
        recruiterLogin: (state, action: PayloadAction<{ isAuthenticated: boolean; recruiterEmail: string; recruiterName: string, recruiterImage: string }>) => {
            state.isAuthenticated = action.payload.isAuthenticated;
            state.recruiterEmail = action.payload.recruiterEmail;
            state.recruiterName = action.payload.recruiterName;
            state.recruiterImage = action.payload.recruiterImage;
        },
        recruiterLogout: (state) => {
            state.isAuthenticated = false;
            state.recruiterEmail = "";
            state.recruiterName = "";
            state.recruiterImage = "";
        },
    },
});

export const { recruiterLogin, recruiterLogout } = recruiterSlice.actions;
export default recruiterSlice.reducer;
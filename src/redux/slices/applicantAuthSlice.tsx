// redux/slices/applicantSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface applicantState {
    isAuthenticated: boolean;
    applicantEmail: string | null;
    applicantName: string | null;
    applicantImage: string | null;
}

const initialState: applicantState = {
    isAuthenticated: false,
    applicantEmail: null,
    applicantName: null,
    applicantImage: null,
};

const applicantSlice = createSlice({
    name: 'applicant',
    initialState,
    reducers: {
        applicantLogin: (state, action: PayloadAction<{ isAuthenticated: boolean; applicantEmail: string; applicantName: string, applicantImage: string }>) => {
            state.isAuthenticated = action.payload.isAuthenticated;
            state.applicantEmail = action.payload.applicantEmail;
            state.applicantName = action.payload.applicantName;
            state.applicantImage = action.payload.applicantImage;
        },
        applicantLogout: (state) => {
            state.isAuthenticated = false;
            state.applicantEmail = null;
            state.applicantName = null;
            state.applicantImage = null;
        },
    },
});

export const { applicantLogin, applicantLogout } = applicantSlice.actions;
export default applicantSlice.reducer;
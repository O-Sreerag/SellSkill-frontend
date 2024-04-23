// redux/slices/userSignupSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SignupFormState {
    role: string;
    email: string;
    password: string;
}

const initialState: SignupFormState = {
    role: 'recruiter',
    email: '',
    password: '',
};

const userSignupSlice = createSlice({
    name: 'SignupForm',
    initialState,
    reducers: {
        setRole: (state, action: PayloadAction<string>) => {
            state.role = action.payload;
        },
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        },
        resetForm: (state) => {
            state.email = '';
            state.password = '';
        },
    },
});

export const { setRole, setEmail, setPassword, resetForm } = userSignupSlice.actions;
export default userSignupSlice.reducer;
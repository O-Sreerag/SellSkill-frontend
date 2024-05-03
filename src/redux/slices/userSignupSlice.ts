// redux/slices/userSignupSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SignupFormState {
    role: string;
    name: string;
    email: string;
    password: string;
}

const initialState: SignupFormState = {
    role: 'recruiter',
    name: '',
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
        setName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        },
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        },
        resetForm: (state) => {
            state.role = 'recruiter'
            state.email = '';
            state.name = ''
            state.password = '';
        },
    },
});

export const { setRole, setEmail, setName, setPassword, resetForm } = userSignupSlice.actions;
export default userSignupSlice.reducer;
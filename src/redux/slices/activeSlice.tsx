// redux/slices/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface userState {
    activeMenu: string | null;
}

const initialState: userState = {
    activeMenu: null,
};

const activeSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        handleActiveMenu: (state, action: PayloadAction<{ activeMenu: string | null }>) => {
            state.activeMenu = action.payload.activeMenu;
        },
    },
});

export const { handleActiveMenu } = activeSlice.actions;
export default activeSlice.reducer;
// redux/store.ts
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import adminAuthReducer from './slices/adminAuthSlice';
import userSignupReducer from './slices/userSignupSlice'
import userAuthReducer from './slices/userAuthSlice';
import activeReducer from './slices/activeSlice';

// Combine all reducers into a root reducer
const rootReducer = combineReducers({
    admin: adminAuthReducer,
    userSignup: userSignupReducer,
    user: userAuthReducer,
    active: activeReducer,
    // Add other reducers here as needed
  });

// Configuration for persisting state
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user', 'admin'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the Redux store with the persisted reducer
const store = configureStore({
    reducer: persistedReducer,
});

// Create a persistor for the Redux store
export const persistore = persistStore(store);

export type AppRootState = ReturnType<typeof store.getState>;
export default store;

// const store = configureStore({
//     reducer: {
//         recruiter: recruiterAuthReducer,
//         // Add other reducers here as needed
//     },
// });
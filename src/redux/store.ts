// redux/store.ts
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import recruiterAuthReducer from './slices/recruiterAuthSlice';
import userSignupReducer from './slices/userSignupSlice'

// Combine all reducers into a root reducer
const rootReducer = combineReducers({
    recruiter: recruiterAuthReducer,
    userSignup: userSignupReducer
    // Add other reducers here as needed
  });

// Configuration for persisting state
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['recruiter'], // specify which reducer states to persist
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
//         login: recruiterLoginReducer,
//         signup: recruiterSignupReducer,
//         // Add other reducers here as needed
//     },
// });
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import serversListReducer from './serversListReducer';

export const store = configureStore({
  reducer: {
    serversList: serversListReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useTypedDispatch: () => AppDispatch = useDispatch;

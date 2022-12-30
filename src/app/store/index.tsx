import { combineReducers, configureStore, PreloadedState } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import serversListReducer from './serversListReducer';

const rootReducer = combineReducers({
  serversList: serversListReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>): any => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = ReturnType<typeof setupStore>;

export const useTypedDispatch: () => AppDispatch = useDispatch;

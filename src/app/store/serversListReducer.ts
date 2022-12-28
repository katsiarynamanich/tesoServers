import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { axiosClient } from 'app/shared/api/axiosClient';
import { RootState } from './';
import { ServerList } from 'app/shared/config/constants';

export const serversListSlice = createSlice({
  name: 'serversList',
  initialState: {
    serversListData: [],
    isServersListDataLoading: false,
    isServersListDataError: false,
  },
  reducers: {
    setServersListData: (state, action) => {
      state.serversListData = action.payload;
    },
    setIsServersListDataLoading: (state, action) => {
      state.isServersListDataLoading = action.payload;
    },
    setIsServersListDataError: (state, action) => {
      state.isServersListDataError = action.payload;
    },
  },
});

export const { setServersListData, setIsServersListDataLoading, setIsServersListDataError } =
  serversListSlice.actions;

export const getServersListDataAsync = () => async (dispatch) => {
  dispatch(setIsServersListDataLoading(true));
  try {
    const response: any = await axiosClient.get('/servers');
    let responseServersList = response?.data;
    if (responseServersList) {
      responseServersList = responseServersList.map((responseServerList, index) => ({
        ...responseServerList,
        id: index,
      }));
      dispatch(setServersListData(responseServersList));
    } else {
      dispatch(setIsServersListDataError(true));
      toast.error(response?.response?.data?.message || 'Not found');
    }
  } catch (err: any) {
    dispatch(setIsServersListDataError(true));
    toast.error(err?.response?.data?.message || 'Not found');
  }

  dispatch(setIsServersListDataLoading(false));
};

export default serversListSlice.reducer;

export const selectServersListData = (state: RootState): ServerList[] =>
  state.serversList.serversListData;
export const selectIsServersListDataLoading = (state: RootState): boolean =>
  state.serversList.isServersListDataLoading;
  export const selectIsServersListDataError = (state: RootState): boolean =>
  state.serversList.isServersListDataError;

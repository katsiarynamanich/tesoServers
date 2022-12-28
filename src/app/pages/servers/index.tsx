import { ReactElement, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';

import AllRoutes from 'app/shared/config/routes';
import { useTypedDispatch } from 'app/store';
import {
  getServersListDataAsync,
  selectIsServersListDataError,
  selectIsServersListDataLoading,
  selectServersListData,
  setServersListData,
} from 'app/store/serversListReducer';
import {
  ACCESS_TOKEN,
  AllColumnHeaders,
  COLUMN_HEADERS,
  INITIAL_SERVERS_LIST_SORTING,
  ServerList,
  sortByNumberAsc,
  sortByStringAsc,
  SortingValues,
} from 'app/shared/config/constants';

import styles from './styles.module.scss';

export default function Servers(): ReactElement {
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();

  const serversListData = useSelector(selectServersListData);
  const isServersListDataLoading = useSelector(selectIsServersListDataLoading);
  const isServersListDataError = useSelector(selectIsServersListDataError);
  const [serversListSorting, setServersListSorting] = useState<any>(INITIAL_SERVERS_LIST_SORTING);

  const tsAccessToken = localStorage.getItem(ACCESS_TOKEN);

  // TODO: redo below useeffect to remove if tsacesstoken
  useEffect(() => {
    if (tsAccessToken) {
      dispatch(getServersListDataAsync());
    } else {
      navigate(AllRoutes.MAIN);
    }
  }, []);

  const sortByColumnHeader = (columnHeader): void => {
    const sortedServersListData: ServerList[] = [...serversListData];

    const sortedFunc =
      columnHeader === AllColumnHeaders.DISTANCE ? sortByNumberAsc : sortByStringAsc;

    if (serversListSorting[columnHeader] === SortingValues.ASCENDING) {
      sortedServersListData.sort(sortedFunc).reverse();
      setServersListSorting({
        ...INITIAL_SERVERS_LIST_SORTING,
        [columnHeader]: SortingValues.DESCENDING,
      });
    } else {
      sortedServersListData.sort(sortedFunc);
      setServersListSorting({
        ...INITIAL_SERVERS_LIST_SORTING,
        [columnHeader]: SortingValues.ASCENDING,
      });
    }

    dispatch(setServersListData(sortedServersListData));
  };

  return (
    <div className={styles.servers__wrapper}>
      {isServersListDataLoading && (
        <div className={styles.servers__loading}>
          <CircularProgress />
        </div>
      )}
      {!isServersListDataLoading && isServersListDataError && (
        <div className={styles.servers__error}>Something is wrong. Please, try again...</div>
      )}
      {!isServersListDataLoading && serversListData?.length > 0 && (
        <div className={styles.servers__tableWrapper}>
          <table>
            <thead>
              <tr>
                {COLUMN_HEADERS.map((columnHeader) => (
                  <th onClick={() => sortByColumnHeader(columnHeader)} key={columnHeader}>
                    <span>{columnHeader}</span>
                    {serversListSorting[columnHeader] === SortingValues.ASCENDING && 'asc'}
                    {serversListSorting[columnHeader] === SortingValues.DESCENDING && 'desc'}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {serversListData.map((serverList) => (
                <tr key={serverList.id}>
                  <td>{serverList[AllColumnHeaders.NAME]}</td>
                  <td>{serverList[AllColumnHeaders.DISTANCE]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

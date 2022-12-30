import { ReactElement, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';

import { useTypedDispatch } from 'app/store';
import {
  getServersListDataAsync,
  selectIsServersListDataError,
  selectIsServersListDataLoading,
  selectServersListData,
  setServersListData,
} from 'app/store/serversListReducer';
import {
  AllColumnHeaders,
  COLUMN_HEADERS,
  INITIAL_SERVERS_LIST_SORTING,
  ServerList,
  sortByNumberAsc,
  sortByStringAsc,
  SortingValues,
} from 'app/shared/config/constants';
import SortIcon from 'app/shared/icons/SortIcon';
import SortAscIcon from 'app/shared/icons/SortAscIcon';
import SortDescIcon from 'app/shared/icons/SortDescIcon';

import styles from './styles.module.scss';

export default function Servers(): ReactElement {
  const dispatch = useTypedDispatch();

  const serversListData = useSelector(selectServersListData);
  const isServersListDataLoading = useSelector(selectIsServersListDataLoading);
  const isServersListDataError = useSelector(selectIsServersListDataError);
  const [serversListSorting, setServersListSorting] = useState<any>(INITIAL_SERVERS_LIST_SORTING);

  useEffect(() => {
    dispatch(getServersListDataAsync());
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
        <div className={styles.servers__error} data-testid="servers-error">
          Something is wrong. Please, try again...
        </div>
      )}
      {!isServersListDataLoading && !isServersListDataError && serversListData?.length === 0 && (
        <div className={styles.servers__error} data-testid="servers-no-data">
          Servers have not got data.
        </div>
      )}
      {!isServersListDataLoading && serversListData?.length > 0 && (
        <div className={styles.servers__tableWrapper}>
          <div className={styles.servers__tableScrollWrapper}>
            <table role="table" className={styles.servers__table}>
              <thead className={styles.servers__thead}>
                <tr>
                  {COLUMN_HEADERS.map((columnHeader) => (
                    <th onClick={() => sortByColumnHeader(columnHeader)} key={columnHeader}>
                      <div className={styles.servers__th}>
                        <span className={styles.servers__theadNaming}>
                          {columnHeader === AllColumnHeaders.NAME
                            ? AllColumnHeaders.SERVERS
                            : columnHeader}
                        </span>
                        <div className={styles.servers__theadIcon}>
                          {serversListSorting[columnHeader] === SortingValues.EMPTY && <SortIcon />}
                          {serversListSorting[columnHeader] === SortingValues.ASCENDING && (
                            <SortAscIcon />
                          )}
                          {serversListSorting[columnHeader] === SortingValues.DESCENDING && (
                            <SortDescIcon />
                          )}
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className={styles.servers__tbody}>
                {serversListData.map((serverList) => (
                  <tr key={serverList.id}>
                    <td align="center" className={styles.servers__td}>
                      {serverList[AllColumnHeaders.NAME]}
                    </td>
                    <td align="center" className={styles.servers__td}>
                      {serverList[AllColumnHeaders.DISTANCE]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

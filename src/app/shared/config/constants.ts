export const ACCESS_TOKEN = 'TS_token';
export interface ServerList {
  name: string;
  distance: number;
  id: number | string;
}

export enum AllColumnHeaders {
  NAME = 'name',
  DISTANCE = 'distance',
}

export enum SortingValues {
  EMPTY = '',
  ASCENDING = 'asc',
  DESCENDING = 'desc',
}

export const COLUMN_HEADERS = [AllColumnHeaders.NAME, AllColumnHeaders.DISTANCE];
export const INITIAL_SERVERS_LIST_SORTING = {
  [AllColumnHeaders.NAME]: SortingValues.EMPTY,
  [AllColumnHeaders.DISTANCE]: SortingValues.EMPTY,
};

export const sortByNumberAsc = (a: ServerList, b: ServerList): number => {
  if (a.distance < b.distance) {
    return -1;
  }
  if (a.distance > b.distance) {
    return 1;
  }
  return 0;
};

export const sortByStringAsc = (a: ServerList, b: ServerList): number =>
  a.name.localeCompare(b.name);

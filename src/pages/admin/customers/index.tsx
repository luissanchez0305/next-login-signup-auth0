import React, { useState, useReducer, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { VirtualTableState, SearchState, DataTypeProvider } from '@devexpress/dx-react-grid';
import {
  Grid,
  Toolbar,
  SearchPanel,
  VirtualTable,
  TableHeaderRow,
} from '@devexpress/dx-react-grid-material-ui';

import { Customer } from '../../../types';
import { APIClient } from '../../../core';
import Layout from '../../../components/layouts';
import { withAuth } from '../../../components/hocs';

const VIRTUAL_PAGE_SIZE = 20;
const MAX_ROWS = 100000;

const client = APIClient.getInstance();
const initialState = {
  rows: [],
  skip: 0,
  requestedSkip: 0,
  take: VIRTUAL_PAGE_SIZE,
  totalCount: 0,
  loading: false,
  lastSearch: '',
  lastCursor: 999999,
};
const getRowId = (row: any) => row._id;

function reducer(state: any, { type, payload }: any) {
  switch (type) {
    case 'UPDATE_ROWS':
      return {
        ...state,
        ...payload,
        loading: false,
      };
    case 'SEARCH':
      return {
        ...state,
        rows: payload.rows,
        totalCount: payload.totalCount,
        loading: false,
      };
    case 'START_LOADING':
      return {
        ...state,
        requestedSkip: payload.requestedSkip,
        take: payload.take,
      };
    case 'REQUEST_ERROR':
      return {
        ...state,
        loading: false,
      };
    case 'FETCH_INIT':
      return {
        ...state,
        loading: true,
      };
    case 'UPDATE_QUERY':
      return {
        ...state,
        lastCursor: payload.customerId,
        lastSearch: payload.searchValue,
      };
    default:
      return state;
  }
}

const LinkProvider = ({ href, ...restProps }: any) => {
  return (
    <DataTypeProvider
      formatterComponent={({ value, row }) => <a href={`${href}/${row._id}`}>{value}</a>}
      {...restProps}
    />
  );
};

const Customers = (): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [searchValue, setSearchValue] = useState('');
  const [columns] = useState([
    { name: '_id', title: 'ID', getCellValue: (row: any) => row._id },
    {
      name: 'name',
      title: 'Name',
      getCellValue: (row) => row.name,
    },
    { name: 'email', title: 'Email', getCellValue: (row) => row.email },
  ]);
  const [tableColumnExtensions] = useState([{ columnName: '_id', width: 250 }]);

  const getRemoteRows = (requestedSkip: any, take: any) => {
    dispatch({ type: 'START_LOADING', payload: { requestedSkip, take } });
  };

  const loadData = async () => {
    const {
      requestedSkip,
      lastSearch,
      lastCursor,
      loading,
      rows: existingRows,
      take,
    } = state;
    const customerId: string | undefined = existingRows.length
      ? (existingRows[existingRows.length - 1] as Customer)._id
      : undefined;

    if (!loading && (customerId !== lastCursor || searchValue !== lastSearch)) {
      dispatch({ type: 'FETCH_INIT' });
      dispatch({ type: 'UPDATE_QUERY', payload: { customerId, searchValue } });
      const result = await client.customers.list(searchValue, customerId, take);
      const { total, data } = result;

      if (searchValue !== lastSearch) {
        dispatch({
          type: 'SEARCH',
          payload: {
            skip: requestedSkip,
            rows: data ?? existingRows,
            totalCount: total < MAX_ROWS ? total : MAX_ROWS,
          },
        });
      } else if (customerId !== lastCursor) {
        dispatch({
          type: 'UPDATE_ROWS',
          payload: {
            skip: requestedSkip,
            rows: data ?? existingRows,
            totalCount: total < MAX_ROWS ? total : MAX_ROWS,
          },
        });
      }
    }
  };

  useEffect(() => {
    async function performRequest() {
      await loadData();
    }
    performRequest();
  });

  const { rows, skip, totalCount, loading } = state;

  return (
    <Layout>
      <h1>Customers</h1>
      <Paper key={'Paper'} style={{ position: 'relative' }}>
        <Grid key={'CustomerGrid'} rows={rows} columns={columns} getRowId={getRowId}>
          <SearchState onValueChange={setSearchValue} />
          <LinkProvider for={['name']} href="/admin/customers" />
          <VirtualTableState
            key={'VirtualTableState'}
            infiniteScrolling
            loading={loading}
            totalRowCount={totalCount}
            pageSize={VIRTUAL_PAGE_SIZE}
            skip={skip}
            getRows={getRemoteRows}
          />
          <VirtualTable columnExtensions={tableColumnExtensions} />
          <TableHeaderRow />
          <Toolbar />
          <SearchPanel />
        </Grid>
      </Paper>
    </Layout>
  );
};

export default withAuth(Customers);

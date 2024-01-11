'use client'

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { abortFetchItems, allItems, fetchItemsAsync, setCurrentPage } from '@/redux/reducer/pagination.reducer';
import store from '@/redux/store';
import { resetAlert } from '@/redux/reducer/alert.reducer';

export default function BlesscomnPage() {
  const dispatch = useDispatch<typeof store.dispatch>();
  const { items, currentPage, status, error } = useSelector(allItems)

  const handleFetchNextPage = async () => {
    dispatch(setCurrentPage(currentPage + 1));
    await dispatch(fetchItemsAsync({ page: currentPage + 1, pageSize: 10 }));
  };

  React.useEffect(() => {
    dispatch(fetchItemsAsync({ page: 1, pageSize: 10 }))
    return () => dispatch(abortFetchItems())
  }, [dispatch])

  React.useEffect(() => {
    () => { dispatch(resetAlert()) }
  }, [])

  return (
    <div>
      <h1>Items: {currentPage}</h1>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Error: {error}</p>}
      {status === 'succeeded' && (
        <>
          <ul>
            {items.map((item, index) => (
              <li key={index}>{JSON.stringify(item)}</li>
            ))}
          </ul>
          <button onClick={handleFetchNextPage}>Fetch Next Page</button>
        </>
      )}
    </div>
  );
}

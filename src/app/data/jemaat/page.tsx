'use client'

import React from 'react';
import { usePathname } from 'next/navigation';

import { useDispatch, useSelector } from 'react-redux';
import store from '@/redux/store';
import { closeSidebar } from '@/redux/reducer/main.reducer';
import { abortFetchItems, allItems, fetchItemsAsync, setCurrentPage } from '@/redux/reducer/pagination.reducer';

import { Typography } from '@material-tailwind/react';
import { ClockIcon } from '@heroicons/react/24/solid';


import ReportDataTable from '@/components/ReportDataTable';
import StatisticsChart from '@/components/StatisticsChart';
import ReportProgressTableList from '@/components/ReportProgressTableList';

import statisticsChartsData from '@/constant/statistic-charts-data.constant';

export default function BlesscomnPage() {
  const dispatch = useDispatch<typeof store.dispatch>();
  const { currentPage } = useSelector(allItems)
  const pathname = usePathname();

  const handleFetchNextPage = async () => {
    dispatch(setCurrentPage(currentPage + 1));
    await dispatch(fetchItemsAsync({ page: currentPage + 1, pageSize: 10 }));
  };

  React.useEffect(() => {
    dispatch(fetchItemsAsync({ page: 1, pageSize: 10 }))
    return () => dispatch(abortFetchItems())
  }, [dispatch])

  React.useEffect(() => {
    dispatch(closeSidebar())
  }, [])

  return (
    <div className='mt-2 xl:grid xl:grid-cols-3 flex flex-col gap-6 h-full row-start-1'>
      <div className="col-span-3">
        <ReportDataTable title={pathname.split("/").join(" ")} />
      </div>
    </div>
  );
}

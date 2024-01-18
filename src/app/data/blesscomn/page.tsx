'use client'

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { abortFetchItems, allItems, fetchItemsAsync, setCurrentPage } from '@/redux/reducer/pagination.reducer';
import store from '@/redux/store';
import { closeSidebar } from '@/redux/reducer/main.reducer';
import ReportDataTable from '@/components/ReportDataTable';
import ReportProgressTable from '@/components/ReportProgressTable';
import StatisticsCard from '@/components/StatisticsCard';
import StatisticsChart from '@/components/StatisticsChart';
import statisticsCardsData from '@/constant/statistic-cards-data.constant';
import statisticsChartsData from '@/constant/statistic-charts-data.constant';
import { ClockIcon } from '@heroicons/react/24/solid';
import { Typography } from '@material-tailwind/react';
import ReportProgressTableList from '@/components/ReportProgressTableList';

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
    dispatch(closeSidebar())
  }, [])

  return (
    <div className='mt-2 xl:grid xl:grid-cols-3 flex flex-col gap-6 h-full row-start-1'>
      <div className='flex flex-col col-span-2 gap-4'>
        <div className="row-span-1 col-span-2">
          <StatisticsChart
            key={statisticsChartsData[1].title}
            {...statisticsChartsData[1]}
            footer={
              <Typography
                variant="small"
                className="flex items-center font-normal text-blue-gray-600"
              >
                <ClockIcon strokeWidth={2} className="h-4 w-4 text-blue-gray-400" />
                &nbsp;{statisticsChartsData[1].footer}
              </Typography>
            }
          />
        </div>
        <div className="col-span-2 row-span-2 grid">
          <ReportDataTable />
        </div>
      </div>
      <div className="md:col-span-1 md:grid">
        <ReportProgressTableList />
      </div>
    </div>
  );
}

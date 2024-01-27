'use client'

import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import store from '@/redux/store';
import { closeSidebar } from '@/redux/reducer/main.reducer';
import { abortFetchItems, allItems, fetchItemsAsync, setCurrentPage } from '@/redux/reducer/pagination.reducer';

import { Typography } from '@material-tailwind/react';
import { ClockIcon } from '@heroicons/react/24/solid';


import ReportDataTable from '@/components/ReportDataTable';
import StatisticsChart from '@/components/StatisticsChart';

import statisticsChartsData from '@/constant/statistic-charts-data.constant';
import { usePathname } from 'next/navigation';
import ListDataBlesscomn from '@/components/ListDataBlesscomn';
import { getBlesscomn, getReportBlesscomn } from '@/redux/reducer/blesscomn.reducer';

// https://react-tailwindcss-datepicker.vercel.app/theming-options
export default function BlesscomnPage() {
  const dispatch = useDispatch<typeof store.dispatch>();
  const pathname = usePathname();

  React.useEffect(() => {
    dispatch(getBlesscomn())
    dispatch(getReportBlesscomn({ page: 1, take: 5 }))
    return () => dispatch(abortFetchItems())
  }, [dispatch])

  React.useEffect(() => {
    dispatch(closeSidebar())
  }, [dispatch])

  return (
    <div className='mt-2 xl:grid xl:grid-cols-3 flex flex-col gap-6'>
      <div className='flex flex-col col-span-2 gap-4'>
        <div className="row-span-1 col-span-2">
          <StatisticsChart
            key={statisticsChartsData[1].title}
            {...statisticsChartsData[1]}
            title={pathname.split("/").join(" ")}
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
          <ReportDataTable title={pathname.split("/").join(" ")} />
        </div>
      </div>
      <div className="md:col-span-1 md:grid">
        <ListDataBlesscomn title={pathname.split("/")[2]} />
      </div>
    </div>
  );
}

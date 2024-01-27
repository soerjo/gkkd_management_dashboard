'use client';

import React from 'react'
import dynamic from 'next/dynamic';
import { useDispatch, useSelector } from 'react-redux';

import StatisticsCard from '@/components/StatisticsCard';
import statisticsCardsData from '@/constant/statistic-cards-data.constant';
import statisticsChartsData from '@/constant/statistic-charts-data.constant';

import { RootState } from '@/redux/store';
import { closeSidebar } from '@/redux/reducer/main.reducer';

import { ClockIcon } from '@heroicons/react/24/solid';
import { Typography } from '@material-tailwind/react';
import ReportProgressTable from '@/components/ReportProgressTable';
import ReportDataTable from '@/components/ReportDataTable';

const StatisticsChart = dynamic(() => import('@/components/StatisticsChart'), { ssr: false, });

const HomePage = () => {

  const dispatch = useDispatch();
  const counter = useSelector((state: RootState) => state.counter.value);

  React.useEffect(() => {
    dispatch(closeSidebar())
  }, [dispatch])

  return (
    <div className="mt-4 flex flex-col gap-4">
      <div className="grid gap-y-10 gap-x-6 grid-cols-2 md:grid-cols-2 xl:grid-cols-4">
        {statisticsCardsData.map(({ icon, title, footer, ...rest }) => (
          <StatisticsCard
            key={title}
            {...rest}
            title={title}
            icon={React.createElement(icon, {
              className: "w-6 h-6 text-white",
            })}
            footer={
              <Typography className="font-normal text-blue-gray-600">
                <strong className={footer.color}>{footer.value}</strong>
                &nbsp;{footer.label}
              </Typography>
            }
          />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
        {statisticsChartsData.map((props) => (
          <StatisticsChart
            key={props.title}
            {...props}
            footer={
              <Typography
                variant="small"
                className="flex items-center font-normal text-blue-gray-600"
              >
                <ClockIcon strokeWidth={2} className="h-4 w-4 text-blue-gray-400" />
                &nbsp;{props.footer}
              </Typography>
            }
          />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-4">
        <div className='xl:col-span-2 grid'>
          <ReportProgressTable />
        </div>
        <div className='xl:col-span-2 grid'>
          <ReportDataTable />
        </div>
      </div>
    </div>
  )
}

export default HomePage
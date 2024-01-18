'use client';

import React from 'react'
import dynamic from 'next/dynamic';
import { useDispatch, useSelector } from 'react-redux';

import StatisticsCard from '@/components/StatisticsCard';
import projectsTableData from '@/constant/project-table-data.constant';
import projectsTableAverage from '@/constant/project-table-everage.constant';
import statisticsCardsData from '@/constant/statistic-cards-data.constant';
import statisticsChartsData from '@/constant/statistic-charts-data.constant';

import { RootState } from '@/redux/store';
import { closeSidebar } from '@/redux/reducer/main.reducer';

import { AcademicCapIcon, ArrowLeftIcon, ArrowRightIcon, ChartBarIcon, CheckCircleIcon, ClockIcon, EllipsisVerticalIcon, UserGroupIcon } from '@heroicons/react/24/solid';
import { Avatar, Card, CardBody, CardHeader, IconButton, Menu, MenuHandler, MenuItem, MenuList, Progress, Tooltip, Typography } from '@material-tailwind/react';

const StatisticsChart = dynamic(() => import('@/components/StatisticsChart'), { ssr: false, });

const HomePage = () => {
  const [active, setActive] = React.useState(1);
  const dispatch = useDispatch();
  const counter = useSelector((state: RootState) => state.counter.value);

  React.useEffect(() => {
    dispatch(closeSidebar())
  }, [])

  return (
    <div className="mt-12">
      <div className="mb-6 grid gap-y-10 gap-x-6 grid-cols-2 md:grid-cols-2 xl:grid-cols-4">
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
      <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
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
      <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-4">
        <Card className="overflow-hidden xl:col-span-2 border border-blue-gray-100 shadow-sm">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 flex items-center justify-between p-6"
          >
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-1">
                Report Progress
              </Typography>
              <Typography
                variant="small"
                className="flex items-center gap-1 font-normal text-blue-gray-600"
              >
                <CheckCircleIcon strokeWidth={3} className="h-4 w-4 text-blue-gray-200" />
                <strong>80% complete</strong> sampai bulan ini.
              </Typography>
            </div>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["admin", "segment", "completion"].map(
                    (el) => (
                      <th
                        key={el}
                        className="border-b border-blue-gray-50 py-3 px-6 text-left"
                      >
                        <Typography
                          variant="small"
                          className="text-[11px] font-medium uppercase text-blue-gray-400"
                        >
                          {el}
                        </Typography>
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {projectsTableData.map(
                  ({ img, name, members, completion }, key) => {
                    const className = `py-3 px-5 ${key === projectsTableData.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                      }`;

                    return (
                      <tr key={name}>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            <Avatar src={img} alt={name} size="sm" />
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-bold"
                            >
                              {name}
                            </Typography>
                          </div>
                        </td>
                        <td className={className}>
                          <div className='flex'>
                            {members.map(({ completion, name }, key) => (
                              <Tooltip key={name} content={`${name}: ${completion}%`}>
                                <div className={`cursor-pointer border-2 border-white ${key === 0 ? "" : "-ml-2.5"}` + ` w-6 h-6 ${(completion >= 100) ? "bg-teal-500" : (completion >= 75) ? "bg-orange-400" : "bg-red-400"} rounded-full p-1`}>
                                  {name === "blesscomn" && <UserGroupIcon className='text-white' />}
                                  {name === "pemuridan" && <AcademicCapIcon className='text-white' />}
                                  {name === "ibadah" && <ChartBarIcon className='text-white' />}
                                </div>
                              </Tooltip>
                            ))}
                          </div>
                        </td>
                        <td className={className}>
                          <div className="w-10/12">
                            <Typography
                              variant="small"
                              className="mb-1 block text-xs font-medium text-blue-gray-600"
                            >
                              {completion}%
                            </Typography>
                            <Progress
                              value={completion}
                              variant="gradient"
                              color={completion === 100 ? "green" : "blue"}
                              className="h-1"
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </CardBody>
          <div className="flex justify-end items-center gap-8 px-4 pb-4">
            <IconButton
              size="sm"
              variant="outlined"
              onClick={() => { }}
              disabled={true}
            >
              <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
            </IconButton>
            <Typography color="gray" className="font-normal">
              Page <strong className="text-gray-900">{active}</strong> of{" "}
              <strong className="text-gray-900">10</strong>
            </Typography>
            <IconButton
              size="sm"
              variant="filled"
              onClick={() => { }}
              disabled={active === 10}
            >
              <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
            </IconButton>
          </div>
        </Card>
        <Card className="overflow-hidden xl:col-span-2 border border-blue-gray-100 shadow-sm">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 flex items-center justify-between p-6"
          >
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-1">
                Report Data
              </Typography>
              <Typography
                variant="small"
                className="flex items-center gap-1 font-normal text-blue-gray-600"
              >
                <CheckCircleIcon strokeWidth={3} className="h-4 w-4 text-blue-gray-200" />
                <strong>Report Blesscomn</strong> sampai minggu ini.
              </Typography>
            </div>
            <Menu placement="left-start">
              <MenuHandler>
                <IconButton size="sm" variant="text" color="blue-gray">
                  <EllipsisVerticalIcon
                    strokeWidth={3}
                    fill="currenColor"
                    className="h-6 w-6"
                  />
                </IconButton>
              </MenuHandler>
              <MenuList>
                <MenuItem>Blesscomn</MenuItem>
                <MenuItem>Pemuridan</MenuItem>
                <MenuItem>Wilayah</MenuItem>
                <MenuItem>Kehadiran Ibadah</MenuItem>
              </MenuList>
            </Menu>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["tanggal", "nama", "wilayah", "segment", "Total"].map(
                    (el) => (
                      <th
                        key={el}
                        className="border-b border-blue-gray-50 py-3 px-6 text-left"
                      >
                        <Typography
                          variant="small"
                          className="text-[11px] font-medium uppercase text-blue-gray-400"
                        >
                          {el}
                        </Typography>
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {projectsTableAverage.map(
                  ({ img, name, completion, segment, wilayah }, key) => {
                    const className = `py-3 px-5 ${key === projectsTableData.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                      }`;

                    return (
                      <tr key={name}>
                        <td className={className}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                          >
                            {new Date().toLocaleDateString('id-ID')}
                          </Typography>
                        </td>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            <Avatar src={img} alt={name} size="sm" />
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-bold"
                            >
                              {name}
                            </Typography>
                          </div>
                        </td>
                        <td className={className}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                          >
                            {wilayah}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                          >
                            {segment}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                          >
                            {completion}
                          </Typography>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </CardBody>
          <div className="flex justify-end items-center gap-8 px-4 pb-4">
            <IconButton
              size="sm"
              variant="outlined"
              onClick={() => { }}
              disabled={true}
            >
              <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
            </IconButton>
            <Typography color="gray" className="font-normal">
              Page <strong className="text-gray-900">{active}</strong> of{" "}
              <strong className="text-gray-900">10</strong>
            </Typography>
            <IconButton
              size="sm"
              variant="filled"
              onClick={() => { }}
              disabled={active === 10}
            >
              <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
            </IconButton>
          </div>
        </Card>

      </div>
    </div>
  )
}

export default HomePage
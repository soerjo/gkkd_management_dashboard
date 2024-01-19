import React from 'react'
import projectsTableData from '@/constant/project-table-data.constant';
import { CheckCircleIcon, UserGroupIcon, AcademicCapIcon, ChartBarIcon, ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid';
import { Card, CardHeader, Typography, CardBody, Avatar, Tooltip, Progress, IconButton } from '@material-tailwind/react';

const ReportProgressTable = () => {
    const [active, setActive] = React.useState(1);
    return (
        <Card className="overflow-auto overflow-y-auto border border-blue-gray-100 shadow-sm">
            <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="m-0 flex items-center justify-between p-6 row-span-1"
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
            <CardBody className="overflow-x-scroll px-0 pt-0 pb-2 row-span-7">
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
            <div className='h-16' />
            <div className="absolute bottom-0 right-0 flex justify-end items-center gap-8 px-4 pb-4  row-end-auto row-span-1">
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
    )
}

export default ReportProgressTable
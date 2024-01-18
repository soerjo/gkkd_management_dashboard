import React from 'react'
import projectsTableData from '@/constant/project-table-data.constant';
import { CheckCircleIcon, UserGroupIcon, AcademicCapIcon, ChartBarIcon, ArrowLeftIcon, ArrowRightIcon, MagnifyingGlassIcon, PencilSquareIcon } from '@heroicons/react/24/solid';
import { Card, CardHeader, Typography, CardBody, Avatar, Tooltip, Progress, IconButton, Input } from '@material-tailwind/react';

const ReportProgressTableList = () => {
    const [active, setActive] = React.useState(1);
    return (
        <Card className="overflow-hidden grid grid-rows-6 border border-blue-gray-100 shadow-sm">
            <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="m-0 flex items-center justify-between p-6 row-span-1"
            >
                <div className='w-full'>
                    <Typography variant="h6" color="blue-gray" className="mb-1">
                        Report Progress Data baru
                    </Typography>
                    <Typography
                        variant="small"
                        className="flex items-center gap-1 font-normal text-blue-gray-600"
                    >
                        <CheckCircleIcon strokeWidth={3} className="h-4 w-4 text-blue-gray-200" />
                        <strong>80% complete</strong> sampai bulan ini.
                    </Typography>
                    <div className="w-full mt-8">
                        <Input label="Input With Icon" icon={<MagnifyingGlassIcon />} />
                    </div>
                </div>
            </CardHeader>
            <CardBody className="overflow-x-scroll px-0 pt-0 pb-2 row-span-7">
                <div className='flex flex-col w-full'>
                    {projectsTableData.map(
                        ({ img, name, members, completion }, key) => {
                            const className = `py-3 px-5 ${key === projectsTableData.length - 1
                                ? ""
                                : "border-b border-blue-gray-50"
                                }`;

                            return (
                                <div className='flex w-full justify-between items-center hover:bg-blue-gray-400/70 px-6 py-2 cursor-pointer'>
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
                                    <IconButton variant="text">
                                        <PencilSquareIcon className="w-5 h-5 text-inherit text-orange-600" />
                                    </IconButton>
                                </div>
                            );
                        }
                    )}
                </div>
            </CardBody>
        </Card>
    )
}

export default ReportProgressTableList
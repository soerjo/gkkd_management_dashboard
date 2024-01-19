import React from 'react'
import projectsTableAverage from '@/constant/project-table-everage.constant';
import { CheckCircleIcon, EllipsisVerticalIcon, ArrowLeftIcon, ArrowRightIcon, PlusCircleIcon, PlusIcon } from '@heroicons/react/24/solid';
import { Card, CardHeader, Typography, Menu, MenuHandler, IconButton, MenuList, MenuItem, CardBody, Button } from '@material-tailwind/react';
import { drawerWithForm } from '../FormDrawer';
import FormAddBlesscomn from '../FormAddBlesscomn';

const DrawerAddFormBlesscomn = drawerWithForm(FormAddBlesscomn)

const ReportDataTable = ({ title = "data" }: { title?: string }) => {
    const [active, setActive] = React.useState(1);
    return (
        <Card className="overflow-hidden border border-blue-gray-100 shadow-sm">
            <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="m-0 flex items-center justify-between p-6 row-span-1"
            >
                <div>
                    <Typography variant="h6" color="blue-gray" className="mb-1 capitalize">
                        Report {title}
                    </Typography>
                    <Typography
                        variant="small"
                        className="flex items-center gap-1 font-normal text-blue-gray-600"
                    >
                        <CheckCircleIcon strokeWidth={3} className="h-4 w-4 text-blue-gray-200" />
                        <strong>Report Blesscomn</strong> sampai minggu ini.
                    </Typography>
                </div>
                <DrawerAddFormBlesscomn >
                    <div className='flex justify-center items-center gap-4'>
                        <Typography variant='small' className='md:flex hidden'>
                            Tambah Data
                        </Typography>
                        <PlusIcon className="h-5 w-5 text-white" />
                    </div>
                </DrawerAddFormBlesscomn>
                {/* <Menu placement="left-start">
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
                </Menu> */}
            </CardHeader>
            <CardBody className="overflow-x-scroll px-0 pt-0 pb-2 row-span-7 overscroll-auto">
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
                            ({ name, completion, segment, wilayah }, index) => {
                                const className = `py-3 px-5 ${index === projectsTableAverage.length - 1
                                    ? ""
                                    : "border-b border-blue-gray-50"
                                    }`;

                                return (
                                    <tr key={index}>
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
                                                {/* <Avatar src={img} alt={name} size="sm" /> */}
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

export default ReportDataTable
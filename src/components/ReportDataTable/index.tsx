import React from 'react'
import projectsTableAverage from '@/constant/project-table-everage.constant';
import { CheckCircleIcon, EllipsisVerticalIcon, ArrowLeftIcon, ArrowRightIcon, PlusCircleIcon, PlusIcon } from '@heroicons/react/24/solid';
import { Card, CardHeader, Typography, Menu, MenuHandler, IconButton, MenuList, MenuItem, CardBody, Button } from '@material-tailwind/react';
import drawerWithForm from '../FormDrawer';
import FormAddReportBlesscomn from '../Page/PageBlesscomn/Report/FormAddReportBlesscomn';
import { useDispatch, useSelector } from 'react-redux';
import { blesscomnReducer, getReportBlesscomn } from '@/redux/reducer/blesscomn.reducer';
import store from '@/redux/store';

const DrawerAddFormBlesscomn = drawerWithForm(FormAddReportBlesscomn)

const takePagination = 5
const ReportDataTable = ({ title = "data" }: { title?: string }) => {
    const [active, setActive] = React.useState(1);
    const { list_report } = useSelector(blesscomnReducer)

    const dispatch = useDispatch<typeof store.dispatch>();

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
            </CardHeader>
            <CardBody className="overflow-x-scroll px-0 pt-0 pb-2 row-span-7 overscroll-auto">
                <table className="w-full min-w-[640px] table-auto">
                    <thead>
                        <tr>
                            {["tanggal", "nama", "wilayah", "laki-laki", "perempuan", "new", "total"].map(
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
                        {list_report && list_report.entities.map(
                            (blesscomnData, index) => {
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
                                                {new Date(blesscomnData.date).toLocaleDateString('id-ID')}
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
                                                    {blesscomnData.blesscomn.name}
                                                </Typography>
                                            </div>
                                        </td>
                                        <td className={className}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                            >
                                                {blesscomnData.blesscomn.region.name}
                                            </Typography>
                                        </td>
                                        <td className={className}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                            >
                                                {blesscomnData.total_male}
                                            </Typography>
                                        </td>
                                        <td className={className}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                            >
                                                {blesscomnData.total_female}
                                            </Typography>
                                        </td>
                                        <td className={className}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                            >
                                                {blesscomnData.new}
                                            </Typography>
                                        </td>
                                        <td className={className}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                            >
                                                {blesscomnData.total}
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
                    variant={list_report?.meta.page <= 1 ? "outlined" : "filled"}
                    onClick={() => { dispatch(getReportBlesscomn({ page: list_report?.meta.page - 1, take: list_report?.meta.offset })) }}
                    disabled={list_report?.meta.page <= 1}
                >
                    <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
                </IconButton>
                <Typography color="gray" className="font-normal">
                    Page <strong className="text-gray-900">{list_report?.meta.page}</strong> of{" "}
                    <strong className="text-gray-900">{list_report?.meta.pageCount}</strong>
                </Typography>
                <IconButton
                    size="sm"
                    variant={list_report?.meta.page >= list_report?.meta.pageCount ? "outlined" : "filled"}
                    onClick={() => { dispatch(getReportBlesscomn({ page: list_report?.meta.page + 1, take: list_report?.meta.offset })) }}
                    disabled={list_report?.meta.page >= list_report?.meta.pageCount}
                >
                    <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                </IconButton>
            </div>
        </Card>
    )
}

export default ReportDataTable
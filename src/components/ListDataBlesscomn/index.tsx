import React from 'react'
import projectsTableData from '@/constant/project-table-data.constant';
import { ArrowLeftIcon, ArrowRightIcon, CheckCircleIcon, MagnifyingGlassIcon, PencilSquareIcon, PlusIcon } from '@heroicons/react/24/solid';
import { Card, CardHeader, Typography, CardBody, Avatar, IconButton, Input, Button } from '@material-tailwind/react';
// import { DrawerWithForm } from '../FormDrawer';
import FormAddBlesscomn from '../Page/PageBlesscomn/List/FormAddBlesscomn';
import drawerWithForm from '../FormDrawer';

const DrawerAddFormBlesscomn = drawerWithForm(FormAddBlesscomn)

const ListDataBlesscomn = ({ title = "data" }: { title?: string }) => {
    const [active, setActive] = React.useState(1);
    return (
        <Card className="overflow-hidden grid-rows-6 border border-blue-gray-100 shadow-sm">
            <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="m-0 flex items-center justify-between p-6 row-span-1"
            >
                <div className='w-full'>
                    <Typography variant="h6" color="blue-gray" className="mb-1 capitalize">
                        List {title}
                    </Typography>
                    <Typography
                        variant="small"
                        className="flex items-center gap-1 font-normal text-blue-gray-600"
                    >
                        <CheckCircleIcon strokeWidth={3} className="h-4 w-4 text-blue-gray-200" />
                        <strong>80% complete</strong> sampai bulan ini.
                    </Typography>
                    <div className="w-full mt-8 flex gap-2">
                        <Input label="Input With Icon" icon={<MagnifyingGlassIcon />} />
                        {/* <Button variant="gradient" className="flex items-center gap-3" size='sm'>
                            <PlusIcon className="h-5 w-5 text-white" />
                        </Button> */}
                        {/* <Button className='absolute'>
                        </Button> */}
                        <DrawerAddFormBlesscomn >
                            <PlusIcon className="h-5 w-5 text-white" />
                        </DrawerAddFormBlesscomn>
                    </div>
                </div>
            </CardHeader>
            <CardBody className="overflow-x-scroll px-0 pt-0 pb-2 row-span-7">
                <div className='flex flex-col w-full'>
                    {projectsTableData.map(
                        ({ img, name, members, completion }, index) => {
                            const className = `py-3 px-5 ${index === projectsTableData.length - 1
                                ? ""
                                : "border-b border-blue-gray-50"
                                }`;

                            return (
                                <div key={index} className='flex w-full justify-between items-center hover:bg-blue-gray-400/10 px-6 py-2'>
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
                                        <PencilSquareIcon className="w-5 h-5 text-inherit text-black" />
                                    </IconButton>
                                </div>
                            );
                        }
                    )}
                </div>
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

export default ListDataBlesscomn
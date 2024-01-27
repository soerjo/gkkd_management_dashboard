'use client'

import React from 'react'
import { Typography, IconButton, Input, Select, Option } from '@material-tailwind/react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ICreateUser } from '@/common/interfaces/create-user.interface';
import createUser from '@/common/validator/create-user.validator';
import { useDispatch, useSelector } from 'react-redux';
import store from '@/redux/store';
import { adminReducer, updateUserAdmin } from '@/redux/reducer/admin.reducer';

export interface FormEditUserProps {
    closeDrawer: () => void
}

const FormEditUser: React.FC<FormEditUserProps> = ({ closeDrawer }) => {
    const { list_wilayah, list_role, selected_admin } = useSelector(adminReducer)

    const {
        setValue,
        register,
        handleSubmit,
        formState: { errors },
        watch,
        getValues
    } = useForm<ICreateUser>({ resolver: yupResolver(createUser), reValidateMode: "onChange" });
    const dispatch = useDispatch<typeof store.dispatch>();

    const onSubmit = async (data: ICreateUser) => {
        const response = (await dispatch(updateUserAdmin({ ...data, id: selected_admin.id }))) as any
        if (response?.error) return
        closeDrawer()
    }

    React.useEffect(() => {
        setValue("name", selected_admin.name)
        setValue("email", selected_admin.email)
        setValue("role", selected_admin.role[0])
        setValue("regions_ids", selected_admin.regions[0].id)
    }, [])

    return (
        <div className='relative p-8 h-full grid grid-rows-12 '>
            <div className="flex flex-col items-center justify-between row-span-2 ">
                <Typography variant="h5" color="blue-gray" className='text-left self-start'>
                    Edit Data Blesscomn
                </Typography>
                <div className='flex w-full justify-center items-center py-6'>
                    <svg width={109} height={109} viewBox="0 0 109 109" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="54.5" cy="54.5" r="54.5" fill="#F7F7F8" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M50.4281 51.1855H40.9193L40.92 51.1869L23 79.1302H27.3887L42.8924 54.9546L46.0157 60.9207L34.3385 79.1295H38.7272L47.9882 64.6885L50.9464 70.3392L45.3092 79.1295H49.6978L52.9188 74.1069L55.5482 79.1295H65.0569L58.154 65.9435L58.9588 64.6885L66.5188 79.1295H76.0276L64.194 56.5251L65.0004 55.2677L77.4922 79.1295H87.001L72.3721 51.1855H67.6182H63.2296H62.8633L63.0279 51.5L62.2216 52.7573L61.3987 51.1855H56.6476H52.2589H51.8899L52.0558 51.5023L51.2509 52.7573L50.4281 51.1855ZM54.0282 55.27L56.9864 60.9207L56.1815 62.1758L53.2233 56.5251L54.0282 55.27Z" fill="url(#paint0_linear_323_4450)" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M62.5014 22L62.5014 34.897L80.0565 34.897V48.5108H62.5014V49.9314H58.0875V44.187H75.6427V39.2208L58.0875 39.2208L58.0875 26.3238H52.2864L52.2864 39.2208H34.0008V44.187H52.2864V49.9314H47.8725V48.5108H29.5869V34.897L47.8725 34.897L47.8725 22H62.5014ZM47.8725 80.523V87.2025H62.5014V80.523H58.0875V82.8787H52.2864V80.523H47.8725Z" fill="url(#paint1_linear_323_4450)" />
                        <defs>
                            <linearGradient id="paint0_linear_323_4450" x1={23} y1="80.1831" x2="88.6858" y2="55.707" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#2186A4" />
                                <stop offset={1} stopColor="#31C4BB" />
                            </linearGradient>
                            <linearGradient id="paint1_linear_323_4450" x1="29.5869" y1="89.6592" x2="87.6563" y2="82.3462" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#2186A4" />
                                <stop offset={1} stopColor="#31C4BB" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
            </div>
            <form className="flex flex-col gap-6 p-4  overflow-auto h-full row-span-10">
                <div>
                    <Typography variant="small" color="blue-gray" className="mb-1 font-medium capitalize">
                        wilayah
                    </Typography>
                    <Select size="lg" value={watch("regions_ids")} onChange={val => setValue("regions_ids", val || "", { shouldValidate: true })} error={errors.regions_ids && true}>
                        {
                            list_wilayah && list_wilayah.entities.map((data, index) => (
                                <Option key={index} value={data.id}>{data.name}</Option>
                            ))
                        }
                    </Select>
                    {errors.regions_ids && <div className="text-red-500 text-sm">{errors.regions_ids.message}</div>}
                </div>
                <div>
                    <Typography variant="small" color="blue-gray" className="mb-1 font-medium capitalize">
                        name
                    </Typography>
                    <Input
                        size="lg"
                        defaultValue={getValues("name")}
                        placeholder="admin_name"
                        label=""
                        {...register('name')}
                        error={errors.name && true}
                    />
                    {errors.name && <div className="text-red-500 text-sm">{errors.name.message}</div>}
                </div>
                <div>
                    <Typography variant="small" color="blue-gray" className="mb-1 font-medium capitalize">
                        email
                    </Typography>
                    <Input
                        size="lg"
                        defaultValue={getValues("email")}
                        placeholder="name@mail.com"
                        label=""
                        {...register('email')}
                        error={errors.email && true}
                    />
                    {errors.email && <div className="text-red-500 text-sm">{errors.email.message}</div>}
                </div>
                <div>
                    <Typography variant="small" color="blue-gray" className="mb-1 font-medium capitalize">
                        role
                    </Typography>
                    <div className="relative flex">
                        <Select size="lg" value={watch("role")} onChange={val => setValue("role", val || "", { shouldValidate: true })} error={errors.role && true}>
                            {
                                list_role && list_role.map((data, index) => (
                                    <Option key={index} value={data}>{data}</Option>
                                ))
                            }
                        </Select>
                    </div>
                    {errors.role && <div className="text-red-500 text-sm">{errors.role.message}</div>}
                </div>

            </form >

            <div className='absolute flex gap-6 bottom-0 right-0 p-8'>
                <IconButton onClick={closeDrawer} className='bg-red-300/20 p-6 rounded-full'>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18" stroke="#D11A2A" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round" />
                        <path d="M6 6L18 18" stroke="#D11A2A" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round" />
                    </svg>
                </IconButton>
                <IconButton onClick={handleSubmit(onSubmit)} className='bg-[#2186A4]/20 p-6 rounded-full'>
                    <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M23.625 12.375V18.75C23.625 21.5784 23.625 22.9926 22.7463 23.8713C21.8676 24.75 20.4534 24.75 17.625 24.75H9.375C6.54657 24.75 5.13236 24.75 4.25368 23.8713C3.375 22.9926 3.375 21.5784 3.375 18.75V12.375C3.375 13.6606 3.375 14.3035 3.65954 14.7782C3.82863 15.0603 4.06469 15.2964 4.34679 15.4655C4.82153 15.75 5.46435 15.75 6.75 15.75H7.55848C8.2542 15.75 8.60206 15.75 8.86395 15.9388C9.12584 16.1275 9.23584 16.4575 9.45585 17.1175L9.66915 17.7575C9.88916 18.4175 9.99916 18.7475 10.261 18.9362C10.5229 19.125 10.8708 19.125 11.5665 19.125H15.4335C16.1292 19.125 16.4771 19.125 16.739 18.9362C17.0008 18.7475 17.1108 18.4175 17.3308 17.7575L17.5442 17.1175L17.5442 17.1175C17.7642 16.4575 17.8742 16.1275 18.136 15.9388C18.3979 15.75 18.7458 15.75 19.4415 15.75H20.25C21.5357 15.75 22.1785 15.75 22.6532 15.4655C22.9353 15.2964 23.1714 15.0603 23.3405 14.7782C23.625 14.3035 23.625 13.6606 23.625 12.375Z" fill="#2186A4" />
                        <path d="M18 6.75H19.625C21.5106 6.75 22.4534 6.75 23.0392 7.33579C23.625 7.92157 23.625 8.86438 23.625 10.75V20.75C23.625 22.6356 23.625 23.5784 23.0392 24.1642C22.4534 24.75 21.5106 24.75 19.625 24.75H7.375C5.48938 24.75 4.54657 24.75 3.96079 24.1642C3.375 23.5784 3.375 22.6356 3.375 20.75V10.75C3.375 8.86438 3.375 7.92157 3.96079 7.33579C4.54657 6.75 5.48938 6.75 7.375 6.75H9" stroke="#2186A4" strokeWidth="2" />
                        <path d="M9 11.25L13.5 14.625M13.5 14.625L18 11.25M13.5 14.625L13.5 3.375" stroke="#2186A4" strokeWidth="2" />
                    </svg>
                </IconButton>
            </div>
        </div >
    )
}

export default FormEditUser
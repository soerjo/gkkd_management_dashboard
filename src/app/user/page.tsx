'use client'

import React from 'react';
import { usePathname } from 'next/navigation';

import { useDispatch, useSelector } from 'react-redux';
import store from '@/redux/store';
import { closeSidebar } from '@/redux/reducer/main.reducer';
import { abortFetchItems } from '@/redux/reducer/pagination.reducer';

import { Button, Card, CardBody, CardHeader, Dialog, DialogFooter, DialogHeader, Drawer, IconButton, Tooltip, Typography } from '@material-tailwind/react';
import { ArrowLeftIcon, ArrowRightIcon, CheckCircleIcon, PlusIcon } from '@heroicons/react/24/solid';

import projectsTableAverage from '@/constant/project-table-everage.constant';
import FormAddUser from '@/components/Page/PageUser/FormAddUser';
import { adminReducer, deleteUserAdmin, getListUserAdmin, selectAdmin } from '@/redux/reducer/admin.reducer';
import FormEditUser from '@/components/Page/PageUser/FormEditUser';
import { ToastContainer } from 'react-toastify';

export default function BlesscomnPage() {
  const [statusDrawer, setStatusDrawer] = React.useState<"edit" | "add" | undefined>();
  const [open, setOpen] = React.useState(false);
  const [selectUser, setSelectUser] = React.useState<any>(undefined);

  const handleOpen = (user: any) => {
    setSelectUser(!selectUser ? user : undefined)
    setOpen(!open);
  }
  const { list_user_admin } = useSelector(adminReducer)

  const dispatch = useDispatch<typeof store.dispatch>();
  const pathname = usePathname();

  React.useEffect(() => {
    dispatch(getListUserAdmin({ page: 1, take: 8 }))
    return () => dispatch(abortFetchItems())
  }, [dispatch])

  React.useEffect(() => {
    dispatch(closeSidebar())
  }, [dispatch])

  const handleDelete = async (user: any) => {
    const response = (await dispatch(deleteUserAdmin(user.id))) as any
    if (response?.error) return
    handleOpen(user)
  }

  const handleForward = () => {
    dispatch(getListUserAdmin({ page: list_user_admin?.meta.page + 1, take: list_user_admin?.meta.offset }))
  }

  const handleBackward = () => {
    dispatch(getListUserAdmin({ page: list_user_admin?.meta.page - 1, take: list_user_admin?.meta.offset }))
  }

  return (
    <>
      <div className='mt-2 xl:grid xl:grid-cols-3 flex flex-col gap-6 h-full row-start-1'>
        <div className="col-span-3">
          <Card className="overflow-hidden border border-blue-gray-100 shadow-sm">
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="m-0 flex items-center justify-between p-6 row-span-1"
            >
              <div>
                <Typography variant="h6" color="blue-gray" className="mb-1 capitalize">
                  List {pathname.split('/').join("")}
                </Typography>
                <Typography
                  variant="small"
                  className="flex items-center gap-1 font-normal text-blue-gray-600"
                >
                  <CheckCircleIcon strokeWidth={3} className="h-4 w-4 text-blue-gray-200" />
                  <strong>Report Blesscomn</strong> sampai minggu ini.
                </Typography>
              </div>
              <div className='flex justify-center items-center gap-4'>
                <Button className='flex gap-4' onClick={() => setStatusDrawer("add")}>
                  <Typography variant='small' className='md:flex hidden'>
                    Tambah Data
                  </Typography>
                  <PlusIcon className="h-5 w-5 text-white" />
                </Button>
              </div>
            </CardHeader>
            <CardBody className="px-0 pt-0 pb-2 row-span-7 overflow-auto">
              <table className="w-full min-w-[640px] table-auto">
                <thead>
                  <tr>
                    {["nama", "email", "wilayah", "role", "action"].map(
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
                  {list_user_admin && list_user_admin.entities.map(
                    (data, index) => {
                      const className = `py-3 px-5 ${index === projectsTableAverage.length - 1
                        ? ""
                        : "border-b border-blue-gray-50"
                        }`;

                      return (
                        <tr key={index}>
                          <td className={className}>
                            <div className="flex items-center gap-4">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-bold"
                              >
                                {data.name}
                              </Typography>
                            </div>
                          </td>
                          <td className={className}>
                            <div className="flex items-center gap-4">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-bold"
                              >
                                {data.email}
                              </Typography>
                            </div>
                          </td>
                          <td className={className}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                            >
                              {data.regions[0].name}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                            >
                              {data.role[0]}
                            </Typography>
                          </td>
                          <td className={className}>
                            <div className='flex gap-2'>
                              <Tooltip content="edit">
                                <IconButton variant='text' className='!rounded-full' onClick={() => {
                                  setStatusDrawer("edit");
                                  dispatch(selectAdmin(data))
                                }} >
                                  <svg width={45} height={45} viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle opacity="0.1" cx="22.5" cy="22.5" r="22.5" fill="#FB8500" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M20.2043 29.5244L27.8924 19.5823C28.3103 19.0461 28.4588 18.4263 28.3196 17.7951C28.1988 17.2213 27.846 16.6758 27.3168 16.2619L26.0261 15.2367C24.9026 14.3431 23.5099 14.4372 22.7113 15.4624L21.8478 16.5827C21.7364 16.7228 21.7642 16.9298 21.9035 17.0426C21.9035 17.0426 24.0855 18.7922 24.132 18.8298C24.2805 18.9709 24.3919 19.159 24.4198 19.3847C24.4662 19.8268 24.1598 20.2407 23.7048 20.2971C23.4913 20.3253 23.287 20.2595 23.1384 20.1372L20.845 18.3124C20.7336 18.2287 20.5665 18.2466 20.4736 18.3595L15.0232 25.414C14.6704 25.8561 14.5497 26.4298 14.6704 26.9848L15.3668 30.0041C15.4039 30.164 15.5432 30.2769 15.7103 30.2769L18.7744 30.2393C19.3315 30.2299 19.8515 29.9759 20.2043 29.5244ZM24.4947 28.5842H29.491C29.9785 28.5842 30.3749 28.9859 30.3749 29.4797C30.3749 29.9744 29.9785 30.3751 29.491 30.3751H24.4947C24.0072 30.3751 23.6107 29.9744 23.6107 29.4797C23.6107 28.9859 24.0072 28.5842 24.4947 28.5842Z" fill="#FB8500" />
                                  </svg>
                                </IconButton>
                              </Tooltip>
                              <Tooltip content="delete">
                                <IconButton variant='text' className='!rounded-full' onClick={() => handleOpen(data)}>

                                  <svg width={45} height={45} viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle opacity="0.1" cx="22.5" cy="22.5" r="22.5" fill="#DF6F79" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M29.3636 17.1788C29.67 17.1788 29.925 17.4332 29.925 17.7569V18.0561C29.925 18.3719 29.67 18.6341 29.3636 18.6341H16.3122C16.005 18.6341 15.75 18.3719 15.75 18.0561V17.7569C15.75 17.4332 16.005 17.1788 16.3122 17.1788H18.6083C19.0747 17.1788 19.4806 16.8473 19.5856 16.3795L19.7058 15.8425C19.8927 15.1109 20.5077 14.625 21.2115 14.625H24.4635C25.1597 14.625 25.7816 15.1109 25.9615 15.8039L26.0902 16.3787C26.1944 16.8473 26.6003 17.1788 27.0675 17.1788H29.3636ZM28.1967 28.118C28.4364 25.8839 28.8561 20.5762 28.8561 20.5227C28.8714 20.3605 28.8186 20.2069 28.7137 20.0833C28.6011 19.9675 28.4586 19.899 28.3016 19.899H17.3786C17.2208 19.899 17.0707 19.9675 16.9665 20.0833C16.8608 20.2069 16.8088 20.3605 16.8164 20.5227C16.8178 20.5325 16.8329 20.7195 16.8581 21.0321C16.9699 22.4206 17.2814 26.288 17.4827 28.118C17.6252 29.4662 18.5098 30.3136 19.7911 30.3443C20.7799 30.3671 21.7985 30.375 22.8401 30.375C23.8212 30.375 24.8176 30.3671 25.837 30.3443C27.1628 30.3214 28.0466 29.4891 28.1967 28.118Z" fill="#D11A2A" />
                                  </svg>
                                </IconButton>
                              </Tooltip>
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
                variant={list_user_admin?.meta.page <= 1 ? "outlined" : "filled"}
                onClick={handleBackward}
                disabled={list_user_admin?.meta.page <= 1}
              >
                <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
              </IconButton>
              <Typography color="gray" className="font-normal">
                Page <strong className="text-gray-900">{list_user_admin?.meta.page}</strong> of{" "}
                <strong className="text-gray-900">{list_user_admin?.meta.pageCount}</strong>
              </Typography>
              <IconButton
                size="sm"
                variant={list_user_admin?.meta.page >= list_user_admin?.meta.pageCount ? "outlined" : "filled"}
                onClick={handleForward}
                disabled={list_user_admin?.meta.page >= list_user_admin?.meta.pageCount}
              >
                <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
              </IconButton>
            </div>
          </Card>
          {
            open &&
            <Dialog open={open} handler={handleOpen}>
              <DialogHeader>Hapus {selectUser?.name}</DialogHeader>
              <DialogFooter>
                <Button
                  variant="text"
                  color="red"
                  onClick={handleOpen}
                  className="mr-1"
                >
                  <span>Cancel</span>
                </Button>
                <Button variant="gradient" color="red" onClick={() => handleDelete(selectUser)}>
                  <span>Confirm</span>
                </Button>
              </DialogFooter>
            </Dialog>
          }
        </div>
      </div >

      <Drawer placement="right" open={statusDrawer === "edit" || statusDrawer === "add"} onClose={() => setStatusDrawer(undefined)}>
        {<>
          <ToastContainer />
          {statusDrawer === "edit" && <FormEditUser closeDrawer={() => setStatusDrawer(undefined)} />}
          {statusDrawer === "add" && <FormAddUser closeDrawer={() => setStatusDrawer(undefined)} />}
        </>}
      </Drawer>

    </>
  );
}    
import React from "react";
import { Drawer, Button } from "@material-tailwind/react";
import { FormAddBlesscomnProps } from "../Page/PageBlesscomn/List/FormAddBlesscomn";
import { ToastContainer } from "react-toastify";

export default function drawerWithForm(WrappedComponent: React.ComponentType<FormAddBlesscomnProps>) {
    return function ({ children }: { children: React.ReactNode }) {
        const [open, setOpen] = React.useState(false);
        const openDrawer = () => setOpen(true);
        const closeDrawer = () => setOpen(false);
        return (
            <>
                <div onClick={openDrawer}>
                    {children}
                </div>
                {/* <Drawer placement="right" open={open} onClose={closeDrawer}>
                    {open && <>
                        <ToastContainer />
                        <WrappedComponent closeDrawer={closeDrawer} />
                    </>}
                </Drawer> */}
            </>
        );
    }
}
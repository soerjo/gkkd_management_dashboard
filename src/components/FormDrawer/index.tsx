import React from "react";
import { Drawer, Button } from "@material-tailwind/react";
import { PlusIcon } from "@heroicons/react/24/solid";
import { FormAddBlesscomnProps } from "../FormAddBlesscomn";

export function drawerWithForm(WrappedComponent: React.ComponentType<FormAddBlesscomnProps>) {
    return ({ children }: { children: React.ReactNode }) => {
        const [open, setOpen] = React.useState(false);
        const openDrawer = () => setOpen(true);
        const closeDrawer = () => setOpen(false);
        return (
            <>
                <Button onClick={openDrawer} className="p-2 px-4">
                    {children}
                </Button>
                <Drawer placement="right" open={open} onClose={closeDrawer}>
                    <WrappedComponent closeDrawer={closeDrawer} />
                </Drawer>
            </>
        );
    }
}
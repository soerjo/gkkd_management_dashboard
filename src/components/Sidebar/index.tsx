"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "@/redux/reducer/main.reducer";
import { RootState } from "@/redux/store";
import { IRoutes } from "@/constant/routes.constant";

import { XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import {
    Accordion,
    AccordionBody,
    AccordionHeader,
    IconButton,
    List,
    ListItem,
    ListItemPrefix,
    Typography,
} from "@material-tailwind/react";

export function Sidenav({ brandName = "GKKD Jakarta", routes }: { brandName?: string; routes: IRoutes[] }) {
    const [open, setOpen] = React.useState<string | null>();

    const handleOpen = (value?: string) => {
        setOpen(open === value ? null : value);
    };

    const pathname = usePathname();

    const { openSidenav } = useSelector((state: RootState) => state.main);
    const dispatch = useDispatch();

    return (
        <aside
            className={`bg-white shadow-sm ${openSidenav ? "translate-x-0" : "-translate-x-80"
                } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0 border border-blue-gray-100`}
        >
            <div className="relative flex items-center">
                <Link href="/" className="py-6 px-8 text-center flex justify-center items-center">
                    <Image src="/logogkkd.png" width={45} height={45} alt="logo_gkkd" priority />
                    <Typography variant="h5" color={"blue-gray"}>
                        {brandName || ""}
                    </Typography>
                </Link>
                <IconButton
                    variant="text"
                    ripple={false}
                    size="sm"
                    className="absolute right-0 rounded-br-none rounded-tl-none xl:hidden bg-blue-gray-600 rounded-full translate-x-4 shadow-md"
                    onClick={() => dispatch(toggleSidebar())}
                >
                    <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
                </IconButton>
            </div>
            <div className="m-4">
                {routes.map(({ layout, title, pages }, key) => (
                    <ul key={key} className="flex flex-col">
                        {pages.map(({ icon, name, path: parent_path, child }) => (
                            <List key={name}>
                                <Accordion
                                    open={child ? open === name : false}
                                    icon={
                                        child && (
                                            <ChevronDownIcon
                                                strokeWidth={2.5}
                                                className={`mx-auto h-4 w-4 transition-transform ${open === name ? "rotate-180" : ""}`}
                                            />
                                        )
                                    }
                                >
                                    <ListItem className="p-0" selected={open === name}>
                                        {child ? (
                                            <AccordionHeader onClick={() => handleOpen(name)} className="border-b-0 p-3">
                                                <div className="flex justify-center">
                                                    <ListItemPrefix>{icon}</ListItemPrefix>
                                                    <Typography color="inherit" className="font-medium capitalize text-left">
                                                        {name || ""}
                                                    </Typography>
                                                </div>
                                            </AccordionHeader>
                                        ) : (
                                            <Link href={`${parent_path}`} className="w-full">
                                                <AccordionHeader onClick={() => handleOpen(name)} className="border-b-0 p-3">
                                                    <div className="flex justify-center">
                                                        <ListItemPrefix>{icon}</ListItemPrefix>
                                                        <Typography color="inherit" className="font-medium capitalize text-left">
                                                            {name || ""}
                                                        </Typography>
                                                    </div>
                                                </AccordionHeader>
                                            </Link>
                                        )}
                                    </ListItem>
                                    {child &&
                                        <AccordionBody className="py-1">
                                            {child.map(({ icon, name, path: child_path }) => (
                                                <List className="p-0" key={name}>
                                                    <Link href={`${parent_path}/${child_path}`} >
                                                        <ListItem>
                                                            <ListItemPrefix>
                                                                <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                                            </ListItemPrefix>
                                                            <Typography color="inherit" className="font-medium capitalize">
                                                                {name || ""}
                                                            </Typography>
                                                        </ListItem>
                                                    </Link>
                                                </List>
                                            ))}
                                        </AccordionBody>
                                    }
                                </Accordion>
                            </List>
                        ))}
                    </ul>
                ))}
            </div>
        </aside>
    );
}

export default Sidenav;

"use client";

import React from "react";
import FooterComponent from "@/components/Footer";
import NavbarComponent from "@/components/Navbar";
import { MultiLevelSidebar } from "@/components/Sidebar";
import { Drawer, ThemeProvider } from "@material-tailwind/react";
import { usePathname } from "next/navigation";
import { drawerTheme } from "@/theme/drawer.theme"
import { Provider } from "react-redux";
import store from "@/redux/store";

export default function Template({ children }: { children: React.ReactNode }) {
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(true);
    const pathname = usePathname()

    const openDrawer = () => setIsDrawerOpen(true);
    const closeDrawer = () => setIsDrawerOpen(false);

    if (pathname.includes('/auth')) return (
        <Provider store={store}>
            <ThemeProvider>{children}</ThemeProvider>
        </Provider>
    )

    return (<>
        <Provider store={store}>
            <ThemeProvider value={{ ...drawerTheme }}>
                <div className="flex h-screen w-full">
                    <Drawer open={isDrawerOpen} onClose={closeDrawer}>
                        <MultiLevelSidebar />
                    </Drawer>
                    <div className="flex flex-col w-full">
                        <NavbarComponent />

                        <div className="flex flex-col w-full h-screen overflow-auto">
                            {children}
                            <FooterComponent />
                        </div>
                    </div>
                </div>
            </ThemeProvider >
        </Provider>
    </>
    )
}
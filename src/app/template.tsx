"use client";

import React from "react";
import { usePathname } from "next/navigation";

import { IconButton, ThemeProvider } from "@material-tailwind/react";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";

import Sidenav from "@/components/Sidebar";
import Footer from "@/components/Footer";
import DashboardNavbar from "@/components/Navbar";
import AlertTemplate, { alertOptions } from "@/components/Alert";
import { routes } from "@/constant/routes.constant";
import { drawerTheme } from "@/theme/drawer.theme"

import { Provider as ReduxProvider } from "react-redux";
import store from "@/redux/store";

import { Provider as AlertProvider } from 'react-alert'

export default function Template({ children }: { children: React.ReactNode }) {
    const [sidenavType, setSidenavType] = React.useState<string>('dark')
    const [sidenavColor, setSidenavColor] = React.useState<string>('dark')
    const pathname = usePathname()

    if (pathname.includes('/auth')) return (
        <>
            <ReduxProvider store={store}>
                <ThemeProvider>
                    <AlertProvider template={AlertTemplate} {...alertOptions}>
                        <div className="relative">
                            {children}
                        </div>
                    </AlertProvider>
                </ThemeProvider>
            </ReduxProvider>
        </>
    )

    return (
        <>
            <ReduxProvider store={store}>
                <ThemeProvider value={{ ...drawerTheme }}>
                    <main className="min-h-screen bg-blue-gray-50/50">
                        <Sidenav
                            routes={routes}
                            brandImg={
                                sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
                            }
                        />
                        <div className="p-4 xl:ml-80">
                            <DashboardNavbar />
                            {/* <Configurator /> */}
                            <IconButton
                                size="lg"
                                color="white"
                                className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
                                ripple={false}
                            //   onClick={() => setOpenConfigurator(dispatch, true)}
                            >
                                <Cog6ToothIcon className="h-5 w-5" />
                            </IconButton>
                            {/* <Routes>
                            {routes.map(
                                ({ layout, pages }) =>
                                layout === "dashboard" &&
                                pages.map(({ path, element }) => (
                                    <Route exact path={path} element={element} />
                                    ))
                                    )}
                                </Routes> */}
                            <div className="relative">
                                {children}
                            </div>
                            <div className="text-blue-gray-600">
                                <Footer />
                            </div>
                        </div>
                    </main>
                </ThemeProvider >
            </ReduxProvider>
        </>
    )
}
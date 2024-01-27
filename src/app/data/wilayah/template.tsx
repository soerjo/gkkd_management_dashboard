"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { ThemeProvider } from "@material-tailwind/react";

import Sidenav from "@/components/Common/Sidebar";
import Footer from "@/components/Common/Footer";
import DashboardNavbar from "@/components/Common/Navbar";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { routes } from "@/constant/routes.constant";
import { drawerTheme } from "@/theme/drawer.theme";

import { Provider as ReduxProvider } from "react-redux";
import store from "@/redux/store";
import AuthHook from "@/hooks/auth.hook";


export default function Template({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()

    if (pathname.includes("/auth"))
        return (
            <ReduxProvider store={store}>
                <ThemeProvider>
                    <AuthHook >
                        <ToastContainer />
                        <div className="relative">{children}</div>
                    </AuthHook>
                </ThemeProvider>
            </ReduxProvider>
        );

    return (
        <ReduxProvider store={store}>
            <ThemeProvider value={{ ...drawerTheme }}>
                <main className="min-h-screen bg-blue-gray-50/50">
                    <Sidenav routes={routes} />
                    <div className="relative pt-4 px-4 xl:ml-80 min-h-screen">
                        <DashboardNavbar />
                        <AuthHook >
                            <ToastContainer />
                            {children}
                        </AuthHook>
                        <Footer />
                    </div>
                </main>
            </ThemeProvider>
        </ReduxProvider >
    );
}

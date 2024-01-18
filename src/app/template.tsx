"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { ThemeProvider } from "@material-tailwind/react";

import Sidenav from "@/components/Sidebar";
import Footer from "@/components/Footer";
import DashboardNavbar from "@/components/Navbar";
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
                    <AuthHook />
                    <div className="relative">{children}</div>
                    <ToastContainer />
                </ThemeProvider>
            </ReduxProvider>
        );

    return (
        <ReduxProvider store={store}>
            <ThemeProvider value={{ ...drawerTheme }}>
                <AuthHook />
                <main className="min-h-screen bg-blue-gray-50/50">
                    <Sidenav routes={routes} />
                    <div className="p-4 xl:ml-80">
                        <DashboardNavbar />
                        <div className="relative">{children}</div>
                        <div className="text-blue-gray-600">
                            <Footer />
                        </div>
                    </div>
                </main>
            </ThemeProvider>
        </ReduxProvider>
    );
}

"use client";

import React from "react";
import { ThemeProvider } from "@material-tailwind/react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider as ReduxProvider } from "react-redux";
import store from "@/redux/store";
import AuthHook from "@/hooks/auth.hook";


export default function Template({ children }: { children: React.ReactNode }) {

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
}

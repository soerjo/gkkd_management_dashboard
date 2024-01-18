'use client'

import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
} from "@material-tailwind/react";
import { color } from "@material-tailwind/react/types/components/alert";

import React from "react";
import dynamic from 'next/dynamic'
// import Chart from 'react-apexcharts'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export function StatisticsChart({ color, chart, title, description, footer }:
    { color: string, chart: any, title: string, description: string, footer: React.ReactNode }) {
    return (
        <Card className="border border-blue-gray-100 shadow-sm min-h-60">
            <CardHeader variant="gradient" color={color as color} floated={false} shadow={false}>
                {/* {(typeof window === 'undefined') && <div className="w-full bg-red-200 min-h-60"></div>} */}
                {(typeof window !== 'undefined') ? <Chart {...chart} /> : <>loading...</>}

                {/* <Chart {...chart} /> */}
            </CardHeader>
            <CardBody className="px-6 pt-0">
                <Typography variant="h6" color="blue-gray">
                    {title}
                </Typography>
                <Typography variant="small" className="font-normal text-blue-gray-600">
                    {description}
                </Typography>
            </CardBody>
            {footer && (
                <CardFooter className="border-t border-blue-gray-50 px-6 py-5">
                    {footer}
                </CardFooter>
            )}
        </Card>
    );
}

export function LoadingStatisticsChart({ color = "", chart = "", title = "", description = "", footer = "" }:
    { color?: string, chart?: any, title?: string, description?: string, footer?: React.ReactNode }) {
    return (
        <Card className="border border-blue-gray-100 shadow-sm min-h-60">
            <CardHeader variant="gradient" color={"white"} floated={false} shadow={false}>
                {/* {(typeof window !== 'undefined') ? <Chart {...chart} /> : <>loading...</>} */}
                <div className="min-h-72 w-full bg-red-200"></div>
            </CardHeader>
            <CardBody className="px-6 pt-0">
                <Typography variant="h6" color="blue-gray">
                    {title}
                </Typography>
                <Typography variant="small" className="font-normal text-blue-gray-600">
                    {description}
                </Typography>
            </CardBody>
            {footer && (
                <CardFooter className="border-t border-blue-gray-50 px-6 py-5">
                    {footer}
                </CardFooter>
            )}
        </Card>
    );

    return <>loading...</>
}


export default StatisticsChart;

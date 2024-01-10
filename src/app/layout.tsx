import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Webmanifest from '../../public/site.webmanifest.json'
import AppleTouch from '../../public/apple-touch-icon.png'
import Icon32 from '../../public/favicon-32x32.png'
import Icon16 from '../../public/favicon-16x16.png'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GKKD Apps",
  description: "gkkd apps",
  manifest: "/public/site.webmanifest",
  icons: [
    { rel: "apple-touch-icon", sizes: "180x180", url: "/public/apple-touch-icon.png" },
    { rel: "icon", type: "image/png", sizes: "32x32", url: "/public/favicon-32x32.png" },
    { rel: "icon", type: "image/png", sizes: "16x16", url: "/public/favicon-16x16.png" }
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}

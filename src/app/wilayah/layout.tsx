import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "wilayah",
  description: "page wilayah",
  manifest: "/site.webmanifest",
  icons: [
    { rel: "apple-touch-icon", sizes: "180x180", url: "/apple-touch-icon.png" },
    { rel: "icon", type: "image/png", sizes: "32x32", url: "/favicon-32x32.png" },
    { rel: "icon", type: "image/png", sizes: "16x16", url: "/favicon-16x16.png" },
    { rel: "icon", type: "image/x-icon", url: "/favicon.ico" }
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}

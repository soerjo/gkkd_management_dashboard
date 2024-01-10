import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "blesscomn",
  description: "page blesscomn",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<>{children}</>)
}

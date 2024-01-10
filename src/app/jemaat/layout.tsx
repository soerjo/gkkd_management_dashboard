import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "jemaat",
  description: "page jemaat",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}

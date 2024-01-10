import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "login",
  description: "page login",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "user",
  description: "page user",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}

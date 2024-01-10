import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "home",
  description: "page home",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}

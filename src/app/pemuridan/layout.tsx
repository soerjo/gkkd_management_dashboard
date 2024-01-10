import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "pemuridan",
  description: "page pemuridan",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}

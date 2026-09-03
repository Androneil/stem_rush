import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "STEM Rush | Find Your Lane. Build Your Future.",
  description:
    "An interactive STEM discovery platform for curious Jamaican students.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-JM">
      <body className="antialiased">{children}</body>
    </html>
  );
}

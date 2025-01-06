import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@nextui-org/link";
import clsx from "clsx";
import "react-phone-input-2/lib/style.css";
import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import { Toaster } from 'sonner'
import NextTopLoader from 'nextjs-toploader';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body className={clsx("bg-background min-h-screen font-sans antialiased", fontSans.variable,)}   >
        <Toaster position="top-center" />
        <NextTopLoader />

        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col h-screen">
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <footer className="flex justify-center items-center py-3 w-full">

            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}

// mx-auto px-6 max-w-7xl container
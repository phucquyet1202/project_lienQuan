import "@/styles/globals.css";
import { Metadata } from "next";
import { Link } from "@nextui-org/link";
import clsx from "clsx";
import { Providers } from "./providers";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import Navbars from "@/components/client/header/navbar";
import ReactQueryProvider from "./ReactQueryProvider";
import { ToastContainer } from "react-toastify";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head></head>
      <body className={clsx(fontSans.className)}>
        <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
          <div className="relative flex flex-col h-screen">
            <ReactQueryProvider>
              {children}
              <ToastContainer />
            </ReactQueryProvider>
          </div>
        </Providers>
      </body>
    </html>
  );
}

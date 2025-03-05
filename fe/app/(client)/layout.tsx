import "@/styles/globals.css";
import { Providers } from "../providers";
import Navbars from "@/components/client/header/navbar";
import "../../styles/banner.css";
export const metadata = {
  title: "Shop Bán Accgame Uy Tín",
  description: "A description of my Next.js app",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <div className="">
        {/* Your header or navigation components */}
        <Navbars />
        <div className=" lg:container lg:mx-auto">{children}</div>
        {/* Your footer components */}
      </div>
    </Providers>
  );
}

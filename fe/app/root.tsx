import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import Style from "./tailwind.css";
import "./tailwind.css?url";
import { NextUIProvider } from "@nextui-org/react";

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: Style,
  },
];

export default function ClientRoot() {
  return (
    <NextUIProvider>
      <html lang="en">
        <head>
          <Meta />
          <Links />
        </head>
        <body className="bg-gray-100 text-gray-900">
          <Outlet />
          <LiveReload />
          <ScrollRestoration />
          <Scripts />
        </body>
      </html>
    </NextUIProvider>
  );
}

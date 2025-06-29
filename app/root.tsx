import type { PropsWithChildren, ReactNode } from "react";
import { Outlet, Links, Meta, ScrollRestoration, Scripts, isRouteErrorResponse } from "react-router";
import type { Route } from "./+types/root";
import { RootLoading } from "./pages/RootLoading";
import BaseLayout from "./pages/BaseLayout";

export default function App() {
    return <Outlet />
}

export const links: Route.LinksFunction = () => [
    {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png"
    },
    {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png"
    },
    {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png"
    },
    {
        rel: "manifest",
        href: "/site.webmanifest"
    }
]

export function Layout({ children }: PropsWithChildren): ReactNode {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />

                <Meta />
                <Links />
            </head>
            <body>
                { children }
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}

export function HydrateFallback() {
    return (
        <RootLoading />
    );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
    let message = "test";
    let details = "what happened there?";
    let stack: string | undefined;

    if (isRouteErrorResponse(error)) {
        message = error.status === 404 ? "404" : "error";
        details = error.status === 404 ? "not found" : error.statusText || details;
    } else if (import.meta.env.DEV && error && error instanceof Error) {
        details = error.message;
        stack = error.stack;
    }

    return (
        <main>
            <h1>{ message }</h1>
            <p>{ details }</p>
            {
                stack && (
                    <pre>
                        <code>{ stack }</code>
                    </pre>
                )
            }
        </main>
    );
}
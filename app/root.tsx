import type { PropsWithChildren, ReactNode } from "react";
import { Outlet, Links, Meta, ScrollRestoration, Scripts, isRouteErrorResponse } from "react-router";
import type { Route } from "./+types/root";
import { RootLoading } from "./pages/RootLoading";
import { RootNode } from "./components/RootNode/RootNode";
import { ErrorCatchAllHTTPPage } from "./pages/error/ErrorCatchAllHTTPPage";
import { ErrorCatchAllReactPage } from "./pages/error/ErrorCatchAllReactPage";

// @ts-expect-error
import "@fontsource-variable/outfit";
// @ts-expect-error
import "@fontsource/ibm-plex-mono";
// @ts-expect-error
import "@fontsource-variable/funnel-sans";

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
    },
    {
        rel: "stylesheet",
        type: "text/css",
        href: "/assets/css/global.css"
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
                <RootNode>
                    { children }
                </RootNode>
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
    let message = "something seems to have gone wrong...";
    let httpCode = 0;
    let errorCode = "ERR_UNKNOWN";

    if (isRouteErrorResponse(error)) {
        if (error.statusText) {
            message = error.statusText;
        }

        httpCode = error.status;

        return (
            <ErrorCatchAllHTTPPage
                message={message}
                httpCode={httpCode}
                errorCode={errorCode}
            />
        );
    } else if (error instanceof Error) {
        message = error.message || error.name;
        errorCode = "ERR_REACT";

        return (
            <ErrorCatchAllReactPage
                message={message}
                errorCode={errorCode}
            />
        );
    } else {
        return <h1>Unknown Error</h1>;
    }
}
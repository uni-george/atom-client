import type { PropsWithChildren, ReactNode } from "react";
import { Outlet, Links, Meta, ScrollRestoration, Scripts, isRouteErrorResponse } from "react-router";
import type { Route } from "./+types/root";
import { RootLoading } from "./pages/RootLoading";
import { RootNode } from "./components/RootNode/RootNode";
import { ErrorCatchAllHTTPPage } from "./pages/error/ErrorCatchAllHTTPPage";
import { ErrorCatchAllReactPage } from "./pages/error/ErrorCatchAllReactPage";

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
            // <>
            //     <h1>
            //     {error.status} {error.statusText}
            //     </h1>
            //     <p>{error.data}</p>
            // </>
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
            // <div>
            //     <h1>Error</h1>
            //     <p>{error.message}</p>
            //     <p>The stack trace is:</p>
            //     <pre>{error.stack}</pre>
            // </div>
            <ErrorCatchAllReactPage
                message={message}
                errorCode={errorCode}
            />
        );
    } else {
        return <h1>Unknown Error</h1>;
    }
    // console.info("HEREEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");

    // // if (isRouteErrorResponse(error)) {
    // //     message = error.status === 404 ? "404" : "error";
    // //     details = error.status === 404 ? "not found" : error.statusText || details;
    // // } else if (import.meta.env.DEV && error && error instanceof Error) {
    // //     details = error.message;
    // //     stack = error.stack;
    // // }

    // if (isRouteErrorResponse(error)) {
    //     if (error.status === 404) {
    //         return (
    //             <NotFoundPage />
    //         );
    //     }
    // }

    // return (
    //     <ErrorCatchAllPage
    //         message={message}
    //         httpCode={httpCode}
    //         errorCode={errorCode}
    //     />
    // );
}
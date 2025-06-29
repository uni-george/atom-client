import type { ReactNode } from "react";
import type { Route } from "./+types/index";

import defaultMeta from "../util/defaultMeta";
import APIManager from "../managers/APIManager";
import { redirect } from "react-router";

export function meta({}: Route.MetaArgs) {
    return defaultMeta;
}

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
    let loggedIn = await APIManager.auth.loggedIn();
    
    if (!loggedIn) return redirect("/login");
    else return redirect("/dashboard");
}

export default function Home({ loaderData }: Route.ComponentProps): ReactNode {
    return (
        <p>
            this page will literally never get displayed
        </p>
    );
}
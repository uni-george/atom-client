import type { ReactNode } from "react";
import type { Route } from "./+types/login";
import { LoginPage } from "../../pages/auth/login/LoginPage";
import { getDefaultMeta } from "../../util/defaultMeta";
import APIManager from "../../managers/APIManager";
import { redirect } from "react-router";

export function meta({}: Route.MetaArgs) {
    return getDefaultMeta("log in - atom");
}

export async function clientLoader() {
    let loggedIn = await APIManager.auth.loggedIn();

    if (loggedIn) return redirect("/dashboard");
    return { };
}

// @ts-expect-error
export default function Login({ loaderData }: Route.ComponentProps): ReactNode {
    return (
        <LoginPage />
    );
}
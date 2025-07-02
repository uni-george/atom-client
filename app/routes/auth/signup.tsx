import type { ReactNode } from "react";
import type { Route } from "./+types/signup";
import { SignupPage } from "../../pages/auth/signup/SignupPage";
import { getDefaultMeta } from "../../util/defaultMeta";
import APIManager from "../../managers/APIManager";
import { redirect } from "react-router";

export function meta({}: Route.MetaArgs) {
    return getDefaultMeta("sign up - atom");
}

export async function clientLoader() {
    let loggedIn = await APIManager.auth.loggedIn();

    if (loggedIn) return redirect("/dashboard");
    return { };
}

// @ts-expect-error
export default function Signup({ loaderData }: Route.ComponentProps): ReactNode {
    return (
        <SignupPage />
    )
}
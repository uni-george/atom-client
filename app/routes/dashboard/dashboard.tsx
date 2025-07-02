import type { ReactNode } from "react";
import type { Route } from "./+types/dashboard";
import { DashboardLayout } from "../../pages/dashboard/DashboardLayout";
import { getDefaultMeta } from "../../util/defaultMeta";
import APIManager from "../../managers/APIManager";
import { redirect } from "react-router";

export function meta({}: Route.MetaArgs) {
    return getDefaultMeta("dashboard - atom");
}

export async function clientLoader() {
    let loggedIn = await APIManager.auth.loggedIn();

    if (!loggedIn) return redirect("/login");
    else return { };
}

export default function Dashboard(): ReactNode {
    return (
        <DashboardLayout />
    );
}
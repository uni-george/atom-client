import { type ReactNode } from "react";
import type { Route } from "./+types/home";
import { getDefaultMeta } from "../../util/defaultMeta";
import { DashboardHome } from "../../pages/dashboard/DashboardHome";

export function meta({ }: Route.MetaArgs) {
    return getDefaultMeta("dashboard - atom");
}

export default function Home(): ReactNode {
    return (
        <DashboardHome />
    );
}
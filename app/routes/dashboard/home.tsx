import { type ReactNode } from "react";
import type { Route } from "./+types/home";
import { getDefaultMeta } from "../../util/defaultMeta";
import { DashboardHome } from "../../pages/dashboard/DashboardHome";
import { setDashboardNavigationContext } from "../../util/setDashboardNavigationContext";
import { DashboardSidebarTabs } from "../../../types/dashboardSidebar";

export function meta({ }: Route.MetaArgs) {
    return getDefaultMeta("dashboard - atom");
}

export default function Home(): ReactNode {
    setDashboardNavigationContext({
        route: [
            {
                name: "home",
                href: "/dashboard"
            }
        ],
        sidebarActiveTab: DashboardSidebarTabs.home,
        title: "welcome!"
    })

    return (
        <DashboardHome />
    );
}
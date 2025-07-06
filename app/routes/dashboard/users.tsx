import type { ReactNode } from "react";
import type { Route } from "./+types/users";
import { UsersPage } from "../../pages/dashboard/users/UsersPage";
import { getDefaultMeta } from "../../util/defaultMeta";
import { setDashboardNavigationContext } from "../../util/setDashboardNavigationContext";
import { DashboardSidebarTabs } from "../../../types/dashboardSidebar";

export function meta({ }: Route.MetaArgs) {
    return getDefaultMeta("users - atom");
}

export default function Users({ }: Route.ComponentProps): ReactNode {
    setDashboardNavigationContext({
        route: [
            {
                name: "users",
                href: "/dashboard/users"
            }
        ],
        sidebarActiveTab: DashboardSidebarTabs.users,
        title: "users"
    });

    return (
        <UsersPage />
    );
}
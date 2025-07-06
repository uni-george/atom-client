import type { ReactNode } from "react";
import { getDefaultMeta } from "../../../util/defaultMeta";
import type { Route } from "./+types/id";
import { setDashboardNavigationContext } from "../../../util/setDashboardNavigationContext";
import { DashboardSidebarTabs } from "../../../../types/dashboardSidebar";
import type { User } from "../../../../types/user";
import { SingleUserPage } from "../../../pages/dashboard/users/SingleUserPage";
import APIManager from "../../../managers/APIManager";

export function meta({ }: Route.MetaArgs) {
    return getDefaultMeta("user - atom")
}

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
    let user: User|undefined;

    user = await APIManager.user.get(params.id);

    return {
        user
    }
}

export default function ID({ loaderData, params }: Route.ComponentProps): ReactNode {
    setDashboardNavigationContext({
        route: [
            {
                name: "users",
                href: "/dashboard/users"
            },
            {
                name: loaderData.user?.name || "unknown user",
                href: `/dashboard/users/${encodeURIComponent(params.id)}`
            }
        ],
        sidebarActiveTab: DashboardSidebarTabs.users,
        title: loaderData.user?.name || "unknown user"
    });

    return (
        <SingleUserPage
            user={loaderData.user}
        />
    );
}
import type { ReactNode } from "react";
import { getDefaultMeta } from "../../util/defaultMeta";
import type { Route } from "./+types/content";
import { setDashboardNavigationContext } from "../../util/setDashboardNavigationContext";
import { DashboardSidebarTabs } from "../../../types/dashboardSidebar";
import { ContentBasePage } from "../../pages/dashboard/content/ContentBasePage";

export function meta({ }: Route.MetaArgs) {
    return getDefaultMeta("content - atom");
}

export default function Content({ }: Route.ComponentProps): ReactNode {
    setDashboardNavigationContext({
        route: [
            {
                name: "content",
                href: "/dashboard/content"
            }
        ],
        sidebarActiveTab: DashboardSidebarTabs.content,
        title: "content"
    });

    return (
        <ContentBasePage />
    );
}
import type { ReactNode } from "react";
import { getDefaultMeta } from "../../../util/defaultMeta";
import type { Route } from "./+types/item";
import { IndividualContentPage } from "../../../pages/dashboard/content/IndividualContentPage";
import { setDashboardNavigationContext } from "../../../util/setDashboardNavigationContext";
import { DashboardSidebarTabs } from "../../../../types/dashboardSidebar";

export function meta({ }: Route.MetaArgs) {
    return getDefaultMeta("content - atom");
}

export default function Content({ params }: Route.ComponentProps): ReactNode {
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
        <IndividualContentPage
            contentID={params.id}
        />
    );
}
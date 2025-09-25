import type { ReactNode } from "react";
import { getDefaultMeta } from "../../../util/defaultMeta";
import type { Route } from "./+types/folder";
import { setDashboardNavigationContext } from "../../../util/setDashboardNavigationContext";
import { ContentFolderPage } from "../../../pages/dashboard/content/ContentFolderPage";
import { DashboardSidebarTabs } from "../../../../types/dashboardSidebar";

export function meta({ }: Route.MetaArgs) {
    return getDefaultMeta("folder - atom");
}

export default function Folder({ params }: Route.ComponentProps): ReactNode {

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
        <ContentFolderPage
            folderID={params.id}
        />
    );
}
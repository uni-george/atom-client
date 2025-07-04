import React, { createContext } from "react";
import type { DashboardSidebarTabs } from "../../types/dashboardSidebar";

type DashboardNavigationRouteEntry = {
    name: string;
    href: string;
}

export type DashboardNavigation = {
    /**
     * Route info for creating the breadcrumb display.
     */
    route: Array<DashboardNavigationRouteEntry>;
    /**
     * The currently active tab in the sidebar.
     */
    sidebarActiveTab: DashboardSidebarTabs;
    /**
     * The currently displayed page title in the header.
     */
    title: string;
}

export type DashboardNavigationContextData = {
    navigationContext: DashboardNavigation|undefined;
    setNavigationContext: React.Dispatch<React.SetStateAction<DashboardNavigation|undefined>>;
}

export const DashboardNavigationContext = createContext<DashboardNavigationContextData|undefined>(undefined);
import type { Enum } from "./enum";

export const DashboardSidebarTabs = {
    home: 0,
    users: 1
};

export type DashboardSidebarTabs = Enum<typeof DashboardSidebarTabs>;
import type { Enum } from "./enum";

export const DashboardSidebarTabs = {
    home: 0,
    users: 1,
    images: 2,
    files: 3,
    userGroups: 4
};

export type DashboardSidebarTabs = Enum<typeof DashboardSidebarTabs>;
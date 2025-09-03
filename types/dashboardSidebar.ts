import type { Enum } from "./enum";

export const DashboardSidebarTabs = {
    home: 0,
    users: 1,
    images: 2,
    files: 3,
    userGroups: 4,
    content: 5,
    pages: 6,
    elements: 7,
    components: 8
};

export type DashboardSidebarTabs = Enum<typeof DashboardSidebarTabs>;
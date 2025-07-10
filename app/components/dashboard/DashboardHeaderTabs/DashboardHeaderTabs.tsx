import { tabClasses, TabList, tabPanelClasses, Tabs, type TabsProps } from "@mui/joy";
import type { ReactNode } from "react";

interface DashboardHeaderTabsProps extends TabsProps {
    tabListContent: ReactNode[];
}

export const DashboardHeaderTabs = ({ children, tabListContent, ...other }: DashboardHeaderTabsProps): ReactNode => {
    return (
        <Tabs
            {...other}
            sx={{
                bgcolor: "transparent",
                [`& .${tabPanelClasses.root}`]: {
                    p: 0
                }
            }}
        >
            <TabList
                tabFlex={1}
                size="sm"
                sx={{
                    pl: {
                        xs: 0,
                        md: 4
                    },
                    position: "sticky",
                    top: "-24px",
                    pt: 1,
                    bgcolor: "background.body",
                    justifyContent: "left",
                    [`& .${tabClasses.root}`]: {
                        fontWeight: "600",
                        flex: "initial",
                        color: "text.tertiary",
                        borderRadius: "6px 6px 0 0",
                        [`&.${tabClasses.selected}`]: {
                            bgcolor: "transparent",
                            color: "text.primary",
                            "&::after": {
                                height: "2px",
                                bgcolor: "primary.500"
                            }
                        }
                    }
                }}
            >
                { tabListContent }
            </TabList>
            { children }
        </Tabs>
    );
}
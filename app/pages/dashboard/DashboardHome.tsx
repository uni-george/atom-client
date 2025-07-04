import { Tab, TabPanel } from "@mui/joy";
import { Fragment, type ReactNode } from "react";
import { DashboardHeaderTabs } from "../../components/dashboard/DashboardHeaderTabs/DashboardHeaderTabs";
import { setDashboardNavigationContext } from "../../util/setDashboardNavigationContext";
import { DashboardMainContent } from "../../components/dashboard/DashboardMainContent/DashboardMainContent";
import { DashboardSidebarTabs } from "../../../types/dashboardSidebar";

export const DashboardHome = (): ReactNode => {
    setDashboardNavigationContext({
        route: [
            {
                name: "home",
                href: "/dashboard"
            }
        ],
        sidebarActiveTab: DashboardSidebarTabs.home,
        title: "welcome!"
    })

    return (
        <DashboardHeaderTabs
            defaultValue={0}
            tabListContent={
                <>
                    <Tab value={0} indicatorInset>test</Tab>
                    <Tab value={1} indicatorInset>other</Tab>
                </>
            }
        >
            <DashboardMainContent>
                <TabPanel value={0}>
                    wow this is the first set of content
                    <br />

                    {
                        [...Array(100)].map((_x, i) => (
                            <Fragment key={i}>
                                {"wow no tabs"}
                                <br />
                            </Fragment>
                        ))
                    }
                </TabPanel>
                <TabPanel value={1}>
                    wow this is the second set of content
                </TabPanel>
            </DashboardMainContent>
        </DashboardHeaderTabs>
        // <>
        //     <Divider />
        //     <DashboardMainContent>
        //         {
        //             [...Array(100)].map((_x, i) => (
        //                 <Fragment key={i}>
        //                     {"wow no tabs"}
        //                     <br />
        //                 </Fragment>
        //             ))
        //         }
        //     </DashboardMainContent>
        // </>
    );
}
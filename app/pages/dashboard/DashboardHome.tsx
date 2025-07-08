import { Divider, Grid } from "@mui/joy";
import { type ReactNode } from "react";
import { DashboardMainContent } from "../../components/dashboard/DashboardMainContent/DashboardMainContent";
import { UsersCard } from "../../components/dashboard/home/UsersCard";
import { GlobalPermissionCheck } from "./GlobalPermissionCheck";
import { GlobalPermissions } from "../../managers/api/Permission";

export const DashboardHome = (): ReactNode => {
       
    return (
        <>
            <Divider />
            <DashboardMainContent>
                <Grid
                    spacing={3}
                >
                    <Grid>
                        <GlobalPermissionCheck
                            permissions={[
                                GlobalPermissions.ManageUsers
                            ]}
                            message="you need the ability to manage users to see this."
                        >
                            <UsersCard />
                        </GlobalPermissionCheck>
                    </Grid>
                </Grid>
            </DashboardMainContent>
        </>
    );
}
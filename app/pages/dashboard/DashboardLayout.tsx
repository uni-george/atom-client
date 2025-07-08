import { useState, type ReactNode } from "react";
import { Outlet, useNavigate } from "react-router";
import { DashboardSidebar } from "../../components/dashboard/DashboardSidebar";
import { Box, Button } from "@mui/joy";
import { type DashboardNavigation, DashboardNavigationContext } from "../../context/DashboardNavigationContext";
import { DashboardHeader } from "../../components/dashboard/DashboardHeader";
import { DashboardSidebarTabs } from "../../../types/dashboardSidebar";
import { GlobalPermissionCheck } from "./GlobalPermissionCheck";
import { GlobalPermissions } from "../../managers/api/Permission";
import { LogoutRounded } from "@mui/icons-material";
import AuthManager from "../../managers/AuthManager";

export default function DashboardLayout(): ReactNode {
    const navigate = useNavigate();
    const [navigationContext, setNavigationContext] = useState<DashboardNavigation|undefined>({
        route: [
            {
                name: "test",
                href: "/testtt"
            },
            {
                name: "test",
                href: "/login"
            }
        ],
        sidebarActiveTab: DashboardSidebarTabs.home,
        title: "welcome!"
    });

    return (
        <Box
            sx={{
                display: "flex",
                minHeight: "100dvh"
            }}
        >
            <GlobalPermissionCheck
                permissions={[
                    GlobalPermissions.AccessDashboard
                ]}
                end={
                    <Button
                        variant="outlined"
                        color="neutral"
                        endDecorator={
                            <LogoutRounded />
                        }
                        sx={{
                            mt: 4,
                            color: "text.tertiary"
                        }}
                        onClick={() => {
                            AuthManager.logout().then(x => {
                                if (x) navigate("/");
                            });
                        }}
                    >
                        log out
                    </Button>
                }
            >
                <DashboardNavigationContext
                    value={{
                        navigationContext,
                        setNavigationContext
                    }}
                >
                    <DashboardSidebar />
                    <Box
                        component="main"
                        sx={{
                            pt: {
                                xs: "calc(12px + var(--Header-height))",
                                md: 3
                            },
                            pb: {
                                xs: 2,
                                sm: 2,
                                md: 3
                            },
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                            minWidth: 0,
                            height: "100dvh",
                            overflow: "auto",
                            bgcolor: "background.body"
                        }}
                    >
                        <DashboardHeader />
                        <Outlet />
                    </Box>
                </DashboardNavigationContext>
            </GlobalPermissionCheck>
        </Box>
    );
}
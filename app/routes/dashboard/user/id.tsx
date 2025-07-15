import { useContext, useEffect, useState, type ReactNode } from "react";
import { getDefaultMeta } from "../../../util/defaultMeta";
import type { Route } from "./+types/id";
import { setDashboardNavigationContext } from "../../../util/setDashboardNavigationContext";
import { DashboardSidebarTabs } from "../../../../types/dashboardSidebar";
import type { User } from "../../../../types/user";
import { SingleUserPage } from "../../../pages/dashboard/users/SingleUserPage";
import APIManager from "../../../managers/APIManager";
import { AuthGuardUserContext } from "../../../context/AuthGuardUserContext";
import { GlobalPermissionCheck } from "../../../pages/dashboard/GlobalPermissionCheck";
import { GlobalPermissions } from "../../../managers/api/Permission";
import { CircularProgress, Divider } from "@mui/joy";
import { DashboardMainContent } from "../../../components/dashboard/DashboardMainContent/DashboardMainContent";
import { Stack } from "@mui/system";

export function meta({ }: Route.MetaArgs) {
    return getDefaultMeta("user - atom")
}

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
    let user: User|undefined;

    user = await APIManager.user.get(params.id);

    return {
        user
    }
}

export default function ID({ loaderData, params }: Route.ComponentProps): ReactNode {
    const user = useContext(AuthGuardUserContext);
    const [canEdit, setCanEdit] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [isManager, setIsManager] = useState<boolean>(false);

    useEffect(() => {
        APIManager.permission.me().then(x => {
            if (x) {
                if (x[GlobalPermissions.EditProfile] || x[GlobalPermissions.ManageUsers]) {
                    if (x[GlobalPermissions.ManageUsers]) {
                        setIsManager(true);
                    }
                    setCanEdit(true);
                } else setCanEdit(false);
            } else {
                setCanEdit(false);
            }
        }).finally(() => {
            setLoading(false);
        })
    });

    setDashboardNavigationContext({
        route: [
            {
                name: "users",
                href: "/dashboard/users"
            },
            {
                name: loaderData.user?.name || "unknown user",
                href: `/dashboard/users/${encodeURIComponent(params.id)}`
            }
        ],
        sidebarActiveTab: DashboardSidebarTabs.users,
        title: loaderData.user?.name || "unknown user"
    });

    let own = loaderData.user?.id && user?.id === loaderData.user.id;

    if (loading) {
        return (
            <>
                <Divider />
                <DashboardMainContent>
                    <Stack
                        width={1}
                        justifyContent="center"
                        alignItems="center"
                    >
                        <CircularProgress />
                    </Stack>
                </DashboardMainContent>
            </>
        );
    }

    return (
        <GlobalPermissionCheck
            permissions={!own ? [
                GlobalPermissions.ManageUsers
            ] : []}
        >
            <SingleUserPage
                user={loaderData.user}
                canEdit={canEdit}
                isManager={isManager}
            />
        </GlobalPermissionCheck>
    );
}
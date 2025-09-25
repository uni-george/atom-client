import { useEffect, useState, type ReactNode } from "react";
import { SelfPermissionCacheContext, SetSelfPermissionCacheContext } from "../../context/SelfPermissionCacheContext";
import { Outlet } from "react-router";
import type { GlobalPermissionsObject } from "../../managers/api/Permission";
import APIManager from "../../managers/APIManager";

export default function SelfPermissionCacheLayout(): ReactNode {
    const [selfPermission, setSelfPermission] = useState<GlobalPermissionsObject|undefined>(undefined);

    useEffect(() => {
        APIManager.permission.me().then(res => {
            setSelfPermission(res);
        }).catch();
    }, []);

    return (
        <SelfPermissionCacheContext
            value={selfPermission}
        >
            <SetSelfPermissionCacheContext
                value={setSelfPermission}
            >
                <Outlet />
            </SetSelfPermissionCacheContext>
        </SelfPermissionCacheContext>
    );
}
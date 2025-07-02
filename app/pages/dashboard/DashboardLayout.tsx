import type { ReactNode } from "react";
import { Outlet } from "react-router";

export const DashboardLayout = (): ReactNode => {
    return (
        <div>
            <h1 style={{
                marginTop: 0
            }}>this is definitely a dashboard</h1>
            <Outlet />
        </div>
    );
}
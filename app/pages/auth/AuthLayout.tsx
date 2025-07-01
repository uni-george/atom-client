import type { ReactNode } from "react";
import { Outlet } from "react-router";
import AuthPageStyle from "./AuthPageStyle";

export default function AuthLayout(): ReactNode {
    return (
        <AuthPageStyle>
            <Outlet />
        </AuthPageStyle>
    );
}
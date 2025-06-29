import type { PropsWithChildren, ReactNode } from "react";
import { RootNode } from "../components/RootNode/RootNode";
import { Outlet } from "react-router";

export default function BaseLayout({ children }: PropsWithChildren): ReactNode {
    return (
        <RootNode>
            <Outlet />
            { children }
        </RootNode>
    );
}
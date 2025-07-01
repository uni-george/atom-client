import type { PropsWithChildren, ReactNode } from "react";
import { Outlet } from "react-router";

export default function BaseLayout({ children }: PropsWithChildren): ReactNode {    
    return (
        <>
            <Outlet />
            { children }
        </>
    );
}
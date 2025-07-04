import { useEffect } from "react";
import type { DashboardNavigation } from "../context/DashboardNavigationContext";
import useDashboardNavigation from "./useDashboardNavigation";

export const setDashboardNavigationContext = (props: DashboardNavigation) => {
    const { setNavigationContext } = useDashboardNavigation();

    useEffect(() => {
        setNavigationContext(props);
    }, []);
}
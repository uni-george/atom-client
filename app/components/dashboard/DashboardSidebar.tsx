import { Box, Divider, GlobalStyles, List, ListItem, ListItemButton, listItemButtonClasses, ListItemContent, Sheet, Stack, Typography } from "@mui/joy";
import { type ReactNode } from "react";
import { ModeSwitcher } from "../ModeSwitcher/ModeSwitcher";
import { AtomLogo } from "../branding/AtomLogo/AtomLogo";
import { ChatBubbleRounded, DashboardRounded, FolderRounded, GroupRounded, GroupsRounded, HomeRounded, ImageRounded, NoteRounded, NotesRounded, VerticalSplitRounded, ViewCarouselRounded } from "@mui/icons-material";
import { SidebarProfile } from "./SidebarProfile";
import useDashboardNavigation from "../../util/useDashboardNavigation";
import { DashboardSidebarTabs } from "../../../types/dashboardSidebar";
import { useNavigate } from "react-router";

export function openSidebar() {
    if (typeof window !== "undefined") {
        document.body.style.overflow = "hidden";
        document.documentElement.style.setProperty("--SideNavigation-slideIn", "1");
    }
}

export function closeSidebar() {
    if (typeof window !== "undefined") {
        document.documentElement.style.removeProperty("--SideNavigation-slideIn");
        document.body.style.removeProperty("overflow");
    }
}

export function toggleSidebar() {
    if (typeof window !== "undefined" && typeof document !== "undefined") {
        const slideIn = window.getComputedStyle(document.documentElement).getPropertyValue("--SideNavigation-slideIn");
        if (slideIn) closeSidebar();
        else openSidebar();
    }
}

type SidebarLink = {
    text: string;
    link?: string;
    tab: DashboardSidebarTabs;
    icon?: ReactNode;
}

export const DashboardSidebar = (): ReactNode => {
    const { navigationContext } = useDashboardNavigation();
    const navigate = useNavigate();

    const tabs: SidebarLink[] = [
        {
            text: "home",
            link: "/dashboard",
            tab: DashboardSidebarTabs.home,
            icon: <HomeRounded />
        },
        {
            text: "users",
            tab: DashboardSidebarTabs.users,
            icon: <GroupRounded />
        },
        {
            text: "groups",
            tab: DashboardSidebarTabs.userGroups,
            icon: <GroupsRounded />
        },
        {
            text: "images",
            tab: DashboardSidebarTabs.images,
            icon: <ImageRounded />
        },
        {
            text: "files",
            tab: DashboardSidebarTabs.files,
            icon: <FolderRounded />
        },
        {
            text: "content",
            tab: DashboardSidebarTabs.content,
            icon: <ChatBubbleRounded />
        },
        {
            text: "pages",
            tab: DashboardSidebarTabs.pages,
            icon: <NoteRounded />
        },
        {
            text: "elements",
            tab: DashboardSidebarTabs.elements,
            icon: <ViewCarouselRounded />
        },
        {
            text: "components",
            tab: DashboardSidebarTabs.components,
            icon: <VerticalSplitRounded />
        }
    ];

    return (
        <Sheet
            sx={{
                position: {
                    xs: "fixed",
                    md: "sticky"
                },
                transform: {
                    xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))",
                    md: "none"
                },
                transition: "transform 0.4s, width 0.4s",
                zIndex: 1000,
                height: "100dvh",
                width: "var(--Sidebar-width)",
                top: 0,
                p: 2,
                flexShrink: 0,
                display: "flex",
                flexDirection: "column",
                gap: 2,
                borderRight: "1px solid",
                borderColor: "divider"
            }}
        >
            <GlobalStyles
                styles={theme => ({
                    ":root": {
                        "--Sidebar-width": "220px",
                        [theme.breakpoints.up("lg")]: {
                            "--Sidebar-width": "240px"
                        }
                    }
                })}
            />
            <Box
                className="Sidebar-overlay"
                sx={{
                    position: "fixed",
                    zIndex: 999,
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    opacity: "var(--SideNavigation-slideIn)",
                    backgroundColor: "var(--atom-palette-background-backdrop)",
                    transition: "opacity 0.4s",
                    transform: {
                        xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))",
                        lg: "translateX(-100%)"
                    }
                }}
                onClick={() => closeSidebar()}
            />
            <Stack
                justifyContent="space-between"
                alignItems="center"
                direction="row"
            >
                <AtomLogo
                    sx={theme => ({
                        ml: theme.spacing(-2)
                    })}
                />
                <ModeSwitcher />
            </Stack>
            <Divider />
            <Box
                sx={{
                    minHeight: 0,
                    overflow: "hidden auto",
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    [`& .${listItemButtonClasses.root}`]: {
                        gap: 1.5
                    }
                }}
            >
                <List
                    size="sm"
                    sx={{
                        gap: 1,
                        "--List-nestedInsetStart": "30px",
                        "--ListItem-radius": theme => theme.vars.radius.sm
                    }}
                >
                    {
                        tabs.map((x, i) => (
                            <ListItem key={i}>
                                <ListItemButton
                                    selected={navigationContext?.sidebarActiveTab == x.tab}
                                    onClick={() => {
                                        navigate(x.link || `/dashboard/${x.text}`);
                                    }}
                                >
                                    { x.icon || <DashboardRounded /> }
                                    <ListItemContent>
                                        <Typography
                                            level="title-sm"
                                        >
                                            { x.text }
                                        </Typography>
                                    </ListItemContent>
                                </ListItemButton>
                            </ListItem>
                        ))
                    }
                </List>
            </Box>
            <Divider />
            <SidebarProfile />
        </Sheet>
    );
}
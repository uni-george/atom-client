import { ChevronRightRounded, DashboardRounded, MenuRounded } from "@mui/icons-material";
import { Box, Breadcrumbs, GlobalStyles, IconButton, Link as MUILink, Sheet, Typography } from "@mui/joy";
import { type ReactNode } from "react";
import useDashboardNavigation from "../../util/useDashboardNavigation";
import { Link } from "react-router";
import { toggleSidebar } from "./DashboardSidebar";

export const DashboardHeader = (): ReactNode => {
    // @ts-expect-error
    const { navigationContext, setNavigationContext } = useDashboardNavigation();

    return (
        <Box
            sx={{
                zIndex: 997
            }}
        >
            <Sheet
                sx={{
                    display: {
                        xs: "flex",
                        md: "none"
                    },
                    alignItems: "center",
                    justifyContent: "space-between",
                    position: "fixed",
                    top: 0,
                    width: "100vw",
                    height: "var(--Header-height)",
                    zIndex: 998,
                    p: 2,
                    gap: 1,
                    borderBottom: "1px solid",
                    borderColor: "background.level1",
                    boxShadow: "sm"
                }}
            >
                <GlobalStyles
                    styles={theme => ({
                        ":root": {
                            "--Header-height": "52px",
                            [theme.breakpoints.up("md")]: {
                                "--Header-height": "0px"
                            }
                        }
                    })}
                />
                <IconButton
                    onClick={() => toggleSidebar()}
                    variant="outlined"
                    color="neutral"
                    size="sm"
                >
                    <MenuRounded />
                </IconButton>
            </Sheet>
            <Box
                sx={{
                    px: {
                        xs: 2,
                        md: 6
                    }
                }}
            >
                <Breadcrumbs
                    size="sm"
                    aria-label="breadcrumbs"
                    separator={
                        <ChevronRightRounded
                            
                        />
                    }
                    sx={{
                        pl: 0
                    }}
                >
                    <Link
                        to="/dashboard"
                        style={{
                            display: "flex"
                        }}
                    >
                        <MUILink
                            component="div"
                            underline="none"
                            color={navigationContext?.route?.length ? "neutral" : "primary"}
                        >
                            <DashboardRounded />
                        </MUILink>
                    </Link>
                    { navigationContext?.route?.map((x, i, a) => (
                        i != a.length - 1 ?
                        <Link
                            to={x.href}
                            key={i}
                            style={{
                                display: "flex",
                                textDecoration: "none"
                            }}
                        >
                            <MUILink
                                component="div"
                                underline="hover"
                                color="neutral"
                                sx={{
                                    fontSize: 12,
                                    fontWeight: 500,
                                }}
                            >
                                <Typography
                                    noWrap
                                    maxWidth={30}
                                >
                                    {x.name}
                                </Typography>
                            </MUILink>
                        </Link>
                        :
                        <Typography
                            color="primary"
                            component="div"
                            sx={{
                                fontSize: 12,
                                fontWeight: 500
                            }}
                            noWrap
                            maxWidth={300}
                        >
                            { x.name }
                        </Typography>
                    )) }
                </Breadcrumbs>
                <Typography
                    level="h2"
                    component="h1"
                    sx={{
                        mt: 1,
                        mb: 2,
                        overflowWrap: "break-word"
                    }}

                >
                    { navigationContext?.title }
                </Typography>
            </Box>
        </Box>
    );
}
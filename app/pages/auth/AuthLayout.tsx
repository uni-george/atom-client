import { Box, Typography } from "@mui/joy";
import type { ReactNode } from "react";
import { Outlet } from "react-router";
import { AtomLogo } from "../../components/branding/AtomLogo/AtomLogo";
import { ModeSwitcher } from "../../components/ModeSwitcher/ModeSwitcher";

export default function AuthLayout(): ReactNode {
    return (
        <Box
            sx={theme => ({
                width: {
                    xs: "100%",
                    md: "50vw"
                },
                transition: "width var(--Transition-duration)",
                transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
                position: "relative",
                zIndex: 1,
                display: "flex",
                justifyContent: "flex-end",
                backdropFilter: "blur(12px)",
                backgroundColor: "rgba(255 255 255 / 0.2)",
                [theme.getColorSchemeSelector("dark")]: {
                    backgroundColor: "rgba(19 19 24 / 0.4)"
                }
            })}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    minHeight: "100dvh",
                    width: "100%",
                    px: 2
                }}
            >
                <Box
                    component="header"
                    sx={{
                        py: 3,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}
                >
                    <AtomLogo
                        sx={{
                            ml: {
                                xs: "-16px",
                                md: "unset"
                            }
                        }}
                    />
                    <ModeSwitcher />
                </Box>
                <Box
                    component="main"
                    sx={{
                        my: "auto",
                        py: 2,
                        pb: 5,
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        width: 400,
                        maxWidth: "100%",
                        mx: "auto",
                        borderRadius: "sm",
                        "& form": {
                            display: "flex",
                            flexDirection: "column",
                            gap: 2
                        },
                        [`& .MuiFormLabel-asterisk`]: {
                            visibility: "hidden"
                        }
                    }}
                >
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
}
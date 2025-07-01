import { Box, Link as MUILink, Typography } from "@mui/joy";
import type { PropsWithChildren, ReactNode } from "react";
import { AtomLogo } from "../../components/branding/AtomLogo/AtomLogo";
import { ModeSwitcher } from "../../components/ModeSwitcher/ModeSwitcher";
import { OpenInNew } from "@mui/icons-material";
import { Link } from "react-router";

export default function AuthPageStyle({ children }: PropsWithChildren): ReactNode {

    return (
        <>
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
                        <Link
                            to="/"
                            style={{
                                textDecoration: "none"
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
                        </Link>
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
                        { children }
                    </Box>
                    <Box
                        component="footer"
                        sx={{
                            py: 3
                        }}
                    >
                        <Typography
                            level="body-xs"
                            sx={{
                                textAlign: "center"
                            }}
                        >
                            &copy; uni_george { new Date().getFullYear() }
                        </Typography>
                    </Box>
                </Box>
            </Box>

            <Box
                sx={{
                    height: "100%",
                    position: "fixed",
                    right: "0",
                    top: "0",
                    bottom: "0",
                    left: {
                        sx: "0",
                        md: "50vw"
                    },
                    transition: "background-image var(--Transition-duration), left var(--Transition-duration) !important",
                    transitionDelay: "calc(var(--Transition-duration + 0.1s))",
                    backgroundColor: "background.level1",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundImage: "url(https://images.unsplash.com/photo-1506744038136-46273834b3fb)"
                }}
            >
                <Box
                    sx={theme => ({
                        display: {
                            xs: "none",
                            md: "unset"
                        },
                        bottom: 0,
                        right: 0,
                        position: "absolute",
                        background: theme.palette.background.level1,
                        px: 1,
                        py: 0.2,
                        borderTopLeftRadius: 10,
                        maxWidth: "100%"
                    })}
                >
                    <Typography
                        level="body-sm"
                        sx={{
                            textAlign: "right"
                        }}
                    >
                        image courtesy of{" "}
                        <MUILink
                            href="https://unsplash.com/@baileyzindel"
                            target="_blank"
                            endDecorator={ <OpenInNew /> }
                        >
                            bailey zindel
                        </MUILink>
                        {" "}on{" "}
                        <MUILink
                            href="https://unsplash.com/photos/body-of-water-surrounded-by-trees-NRQV-hBF10M"
                            target="_blank"
                            endDecorator={ <OpenInNew /> }
                        >
                            unsplash
                        </MUILink>
                    </Typography>
                </Box>
            </Box>
        </>
    );
}
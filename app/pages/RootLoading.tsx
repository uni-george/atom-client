import type { ReactNode } from "react"
import { Box } from "@mui/joy";
import { AtomLogoLoading } from "../components/branding/AtomLogo/AtomLogo";

export const RootLoading = (): ReactNode => {

    return (
        <>
            <style>
                {
                    `
                    html, body {
                        padding: 0;
                        margin: 0;
                        min-height: 100vh;
                    }
                    `
                }
            </style>
            <Box
                sx={{
                    width: "100%",
                    height: "100vh",
                    background: "#08080a",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <AtomLogoLoading />
            </Box>
        </>
    );
}
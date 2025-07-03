import { Box, LinearProgress } from "@mui/joy";
import type { ReactNode } from "react";

interface FormLoadingBoxProps {
    show?: boolean;
}

export const FormLoadingBox = ({ show }: FormLoadingBoxProps): ReactNode => {
    return (
        <Box
            sx={theme => ({
                position: "absolute",
                top: `-${theme.radius.xl}`,
                left: `-${theme.radius.xl}`,
                width: `calc(100% + (2 * ${theme.radius.xl}))`,
                height: `calc(100% + (2 * ${theme.radius.xl}))`,
                background: theme.palette.background.surface,
                zIndex: 1,
                opacity: show ? 0.8 : 0,
                borderRadius: theme.radius.lg,
                pointerEvents: "none",
                transition: "opacity 0.2s"
            })}
        >
            <Box
                sx={{
                    width: "80%",
                    mx: "auto",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <Box sx={{ width: "100%" }}>
                    <LinearProgress />
                </Box>
            </Box>
        </Box>
    );
}
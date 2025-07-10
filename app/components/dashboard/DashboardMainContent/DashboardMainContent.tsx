import { Box } from "@mui/joy";
import type { PropsWithChildren, ReactNode } from "react";

export const DashboardMainContent = ({ children }: PropsWithChildren): ReactNode => {
    return (
        <Box
            sx={{
                display: "flex",
                flexGrow: 1,
                px: {
                    xs: 2,
                    md: 6
                },
                pt: {
                    xs: 2,
                    md: 3
                }
            }}
        >
            { children }
        </Box>
    );
}
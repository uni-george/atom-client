import { Typography, type TypographyProps } from "@mui/joy";
import type { ReactNode } from "react";

export const Small = (props: TypographyProps): ReactNode => {
    const { sx, children, ...other } = props;

    return (
        <Typography
            level="body-xs"
            sx={{
                opacity: "0.5",
                ...sx
            }}
            {...other}
        >
            { children }
        </Typography>
    );
}
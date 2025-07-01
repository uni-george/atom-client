import { Card, CardContent, Sheet, Stack, Typography, type CardProps, type SheetProps } from "@mui/joy";
import type { ReactNode } from "react";
import { Small } from "../Small/Small";

interface ErrorCardProps extends CardProps {
    title?: string;
    code?: string;
}

export const ErrorCard = (props: ErrorCardProps): ReactNode => {
    const { variant, color, title, children, code = "ERR_UNKNOWN", ...other } = props;

    return (
        <Stack
            gap={1}
        >
            <Card
                variant="outlined"
                color="danger"
                {...other}
            >
                <CardContent>
                    <Typography
                        level="h2"
                        color="danger"
                    >
                        { title || "error :(" }
                    </Typography>
                    { children }
                </CardContent>
            </Card>
            <Small>
                { code }
            </Small>
        </Stack>
    );
}

interface ErrorCardCodeProps extends SheetProps {
    lines?: number;
}

export const ErrorCardCode = (props: ErrorCardCodeProps): ReactNode => {
    const { lines, children, sx, ...other } = props;

    return (
        <Sheet
            variant="outlined"
            sx={theme => ({
                background: theme.palette.background.level1,
                p: 1,
                borderRadius: theme.radius.md,
            })}
            {...other}
        >
            <Typography
                component="code"
                level="body-xs"
                sx={{
                    display: "-webkit-box",
                    overflow: "hidden",
                    WebkitLineClamp: lines,
                    lineClamp: lines,
                    WebkitBoxOrient: "vertical",
                    textOverflow: "ellipsis",
                    ...sx
                }}
            >
                { children }
            </Typography>
        </Sheet>
    );
}
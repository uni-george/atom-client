import { Box, Card, CardContent, Sheet, Stack, Typography, type CardProps, type SheetProps } from "@mui/joy";
import type { ReactNode } from "react";
import { Small } from "../Small/Small";
import { ReportRounded } from "@mui/icons-material";

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
                variant={variant || "outlined"}
                color={color || "danger"}
                {...other}
            >
                <CardContent
                    orientation="horizontal"
                >
                    <Box
                        sx={{
                            "--Icon-color": theme => theme.palette[color || "danger"].solidBg
                        }}
                    >
                        <ReportRounded
                            sx={{
                                fontSize: "60px"
                            }}
                        />
                    </Box>
                    <CardContent>
                        <Typography
                            level="h2"
                            color={color || "danger"}
                        >
                            { title || "error :(" }
                        </Typography>
                        { children }
                    </CardContent>
                </CardContent>
            </Card>
            <Small
                textTransform="uppercase"
            >
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
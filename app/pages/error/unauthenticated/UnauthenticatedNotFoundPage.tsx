import type { ReactNode } from "react";
import { Card, CardActions, CardContent, Link, Sheet, Stack, Typography } from "@mui/joy";
import { useLocation, useNavigate } from "react-router";
import { Small } from "../../../components/Small/Small";

export const UnauthenticatedNotFoundPage = (): ReactNode => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    return (
        <Stack
            gap={1}
        >
            <Card
                variant="outlined"
                color="warning"
            >
                <CardContent>
                    <Typography
                        level="h2"
                    >
                        404
                    </Typography>
                    <Typography
                        level="body-md"
                    >
                        i can't find anything to display for this address...                        
                    </Typography>
                    <Sheet
                        variant="outlined"
                        sx={theme => ({
                            background: theme.palette.background.level1,
                            p: 1,
                            mt: 1,
                            borderRadius: theme.radius.md
                        })}
                    >
                        <Typography
                            component="code"
                            level="body-xs"
                            sx={{
                                display: "-webkit-box",
                                overflow: "hidden",
                                WebkitLineClamp: 1,
                                lineClamp: 1,
                                WebkitBoxOrient: "vertical",
                                textOverflow: "ellipsis"
                            }}
                        >
                            GET { pathname }
                        </Typography>
                    </Sheet>
                </CardContent>
                <CardActions
                    sx={{
                        pt: 0
                    }}
                >
                    <Link
                        onClick={e => {
                            e.preventDefault();
                            navigate(-1);
                        }}
                    >
                        go back
                    </Link>
                </CardActions>
            </Card>
            <Small>
                ERR_PAGE_NOT_FOUND
            </Small>
        </Stack>
    );
}
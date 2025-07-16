import { KeyboardArrowLeftRounded, KeyboardArrowRightRounded } from "@mui/icons-material";
import { Box, Button, IconButton, Stack } from "@mui/joy";
import type { SxProps } from "@mui/joy/styles/types";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import { useSearchParams } from "react-router";

interface PaginatorProps {
    disableSearchParams?: boolean;
    numPages: number;
    page: number;
    setPage: Dispatch<SetStateAction<number>>;
    includeButtons?: boolean;
    sx?: SxProps
}

export const Paginator = ({ page, numPages, setPage, disableSearchParams, includeButtons, sx }: PaginatorProps): ReactNode => {
    const [searchParams, setSearchParams] = useSearchParams();

    return (
        <Stack
            direction="row"
            gap={1}
            justifyContent={includeButtons ? "space-between" : "center"}
            sx={sx}
        >
            {
                includeButtons &&
                <Box
                    flexGrow={1}
                    flexBasis={0}
                >
                    <Button
                        size="sm"
                        variant="outlined"
                        color="neutral"
                        startDecorator={
                            <KeyboardArrowLeftRounded />
                        }
                        onClick={() => {
                            setPage(page - 1);
                            if (!disableSearchParams) {
                                searchParams.set("page", (page - 1).toString());
                                setSearchParams(searchParams);
                            }
                        }}
                        disabled={page <= 1}
                    >
                        previous
                    </Button>
                </Box>
            }
            <Stack
                direction="row"
                justifyContent="center"
                gap={1}
            >
                {
                    [1, "...", ...[...Array(5).keys()].map(x => page + x - 2).filter(x => x > 0 && x <= numPages), "...", numPages].filter((x, i, a) => {
                        if (i == 0) {
                            if (a[i + 2] == x) return false;
                            return true;
                        }
                        if (typeof x == "string") {
                            if (a[i - 1] == (a[i + 1] as number - 1) || a[i - 1] == a[i + 1]) return false;
                            return true;
                        }
                        if (i == a.length - 1) {
                            if (a[i - 2] == x) return false;
                            return true;
                        }
                        return true;
                    }).map(x => (
                        <IconButton
                            key={x}
                            size="sm"
                            color="neutral"
                            variant={typeof x == "number" ? "outlined" : "plain"}
                            sx={{
                                aspectRatio: 1,
                                color: page == x ? "background.body" : "text.secondary",
                                borderRadius: "50%",
                                bgcolor: page == x ? "text.primary" : "transparent",
                                borderColor: page == x ? "text.primary" : "neutral.outlineBorder",
                                "&:hover": {
                                    bgcolor: page == x ? "neutral.plainHoverColor" : "neutral.outlinedHoverColor"
                                },
                                userSelect: typeof x == "number" ? "none" : "unset"
                            }}
                            onClick={() => {
                                if (typeof x != "number") return;
                                setPage(x);
                                if (!disableSearchParams) {
                                    searchParams.set("page", x.toString());
                                    setSearchParams(searchParams);
                                }
                            }}
                        >
                            {x}
                        </IconButton>
                    ))
                }
            </Stack>
            {
                includeButtons &&
                <Box
                    flexGrow={1}
                    flexBasis={0}
                    display="flex"
                    justifyContent="end"
                >
                    <Button
                        size="sm"
                        variant="outlined"
                        color="neutral"
                        endDecorator={
                            <KeyboardArrowRightRounded />
                        }
                        onClick={() => {
                            setPage(page + 1);
                            if (!disableSearchParams) {
                                searchParams.set("page", (page + 1).toString());
                                setSearchParams(searchParams);
                            }
                        }}
                        disabled={page == numPages}
                    >
                        next
                    </Button>
                </Box>
            }
        </Stack>
    );
}
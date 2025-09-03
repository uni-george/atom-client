import { Box, Button, CircularProgress, Divider, FormControl, FormLabel, Stack, Typography } from "@mui/joy";
import { useEffect, useState, type ReactNode } from "react";
import { DashboardMainContent } from "../../../components/dashboard/DashboardMainContent/DashboardMainContent";
import type { ContentFolderObject, ContentObject } from "../../../managers/api/Content";
import APIManager from "../../../managers/APIManager";
import { ContentSystemTable } from "../../../components/dashboard/content/ContentSystemTable";

export const ContentBasePage = (): ReactNode => {
    const [topLevel, setTopLevel] = useState<{ folders: ContentFolderObject[], content: ContentObject[] }|undefined>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        APIManager.content.getTopLevel().then(res => {
            setTopLevel(res);
        }).catch(e => {
            setError(e.message);
        }).finally(() => {
            setLoading(false);
        })
    }, []);

    return (
        <>
            <Divider />
            <DashboardMainContent>
                <Box
                    sx={{
                        width: 1
                    }}
                >
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        gap={1.5}
                    >
                        <Box
                            sx={{
                                flexGrow: 1,
                                maxWidth: "calc(100% - (2 * 120px))"
                            }}
                        >
                            <Typography
                                level="h2"
                                noWrap
                                width={1}
                            >
                                /
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                pb: 2,
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 1.5,
                                justifyContent: "end"
                            }}
                        >
                            <FormControl>
                                <Button>
                                    new folder
                                </Button>
                            </FormControl>
                            <FormControl

                            >
                                <Button>
                                    new content
                                </Button>
                            </FormControl>
                        </Box>
                    </Stack>
                    {
                        loading ?
                            <Stack
                                justifyContent="center"
                                alignItems="center"
                                width={1}
                            >
                                <CircularProgress />
                            </Stack>
                            :
                            <ContentSystemTable
                                folders={topLevel?.folders || []}
                                content={topLevel?.content || []}
                            />
                    }
                </Box>
            </DashboardMainContent>
        </>
    );
}
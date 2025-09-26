import { Link as MUILink, CircularProgress, Divider, Stack, Typography, Box } from "@mui/joy";
import { useEffect, useState, type ReactNode } from "react";
import { DashboardMainContent } from "../../../components/dashboard/DashboardMainContent/DashboardMainContent";
import type { ContentFolderObject, ContentObject } from "../../../managers/api/Content";
import APIManager from "../../../managers/APIManager";
import { PathBreadcrumbs } from "../../../components/dashboard/content/ContentFolderActionBar";
import { noResultsKaomoji } from "../../../util/noResultsKaomoji";
import { Link } from "react-router";
import { ContentMetadataEditor } from "../../../components/dashboard/content/individual/ContentMetadataEditor";
import { ContentEditor } from "../../../components/dashboard/content/individual/ContentEditor";

export const IndividualContentPage = ({ contentID }: { contentID: string }): ReactNode => {
    const [loading, setLoading] = useState<boolean>(true);
    const [remoteData, setRemoteData] = useState<ContentObject|undefined>(undefined);
    const [parentRemoteData, setParentRemoteData] = useState<ContentFolderObject|undefined>(undefined);
    const [reloadTrigger, setReloadTrigger] = useState<boolean>(false);
    // TODO: error display
    // @ts-ignore
    const [error, setError] = useState<string>("");

    const [newData, setNewData] = useState<string | number | undefined>(undefined);

    const loadRemoteData = () => {
        setLoading(true);
        APIManager.content.getContent(contentID).then(res => {
            setRemoteData(res);
            setNewData(res?.data);
        }).catch(e => {
            setError(e?.message || e);
        }).finally(() => {
            setLoading(false);
        });
    }

    const loadParentRemoteData = () => {
        if (remoteData?.parentID) {
            APIManager.content.getFolder(remoteData.parentID, true).then(res => {
                console.log(res);
                setParentRemoteData(res);
            }).catch();
        }
    }

    const saveNewData = () => {
        if (!remoteData) return;
        setLoading(true);
        APIManager.content.update(remoteData.id, {
            data: newData
        }).then(() => {
            reload();
        }).catch(e => {
            setError(e);
            setLoading(false);
        });
    }

    const reload = () => {
        setReloadTrigger(!reloadTrigger);
    }

    useEffect(() => {
        loadRemoteData();
    }, [reloadTrigger]);

    useEffect(() => {
        loadParentRemoteData();
    }, [remoteData])

    return (
        <>
            <Divider />
            <DashboardMainContent>
                {
                    loading ?
                        <Stack
                            justifyContent="center"
                            alignItems="center"
                            width={1}
                        >
                            <CircularProgress />
                        </Stack>
                    : remoteData ?
                        <Box
                            sx={{
                                width: 1
                            }}
                        >
                            <Stack
                                direction="row"
                                justifyContent="start"
                                alignContent="center"
                                sx={{
                                    width: 1,
                                    mb: 2
                                }}
                            >
                                <Link
                                    to={"/dashboard/content"}
                                >
                                    <MUILink
                                        component="div"
                                        level="h3"
                                        textColor="text.primary"
                                        sx={{
                                            width: "fit-content"
                                        }}
                                    >
                                        /
                                    </MUILink>
                                </Link>
                                <PathBreadcrumbs
                                    path={[
                                        ...(parentRemoteData?.path || []),
                                        {
                                            name: remoteData?.name || "unnamed content",
                                            id: remoteData?.id ? `../${encodeURIComponent(remoteData.id)}` : "../"
                                        }
                                    ]}
                                />
                            </Stack>
                            <Stack
                                gap={3}
                                width={1}
                            >
                                <ContentEditor
                                    remoteData={remoteData}
                                    newData={newData}
                                    setNewData={setNewData}
                                    onSaveNewData={() => {
                                        saveNewData();
                                    }}
                                />
                                <ContentMetadataEditor />
                            </Stack>
                        </Box>
                    :
                        <Stack
                            width={1}
                            sx={{
                                p: 3,
                            }}
                        >
                            <Typography
                                sx={{
                                    textAlign: "center",
                                    mb: 2
                                }}
                                level="h1"
                                textColor="text.tertiary"
                                component="code"
                            >
                                {
                                    noResultsKaomoji[0]
                                }
                            </Typography>
                            <Typography
                                sx={{
                                    textAlign: "center"
                                }}
                                level="body-lg"
                                textColor="text.tertiary"
                            >
                                unknown content
                            </Typography>
                            <Typography
                                sx={{
                                    textAlign: "center",
                                    mt: 1
                                }}
                            >
                                <Link
                                    to="/dashboard/content"
                                >
                                    <MUILink
                                        component="div"
                                    >
                                        back to /
                                    </MUILink>
                                </Link>
                            </Typography>
                        </Stack>
                }
            </DashboardMainContent>
        </>
    );
}
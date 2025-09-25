import { Link as MUILink, CircularProgress, Divider, Stack, Typography } from "@mui/joy";
import { useEffect, useState, type ReactNode } from "react";
import { DashboardMainContent } from "../../../components/dashboard/DashboardMainContent/DashboardMainContent";
import type { ContentFolderObject, ContentObject } from "../../../managers/api/Content";
import APIManager from "../../../managers/APIManager";
import { PathBreadcrumbs } from "../../../components/dashboard/content/ContentFolderActionBar";
import { noResultsKaomoji } from "../../../util/noResultsKaomoji";
import { Link } from "react-router";

export const IndividualContentPage = ({ contentID }: { contentID: string }): ReactNode => {
    const [loading, setLoading] = useState<boolean>(true);
    const [remoteData, setRemoteData] = useState<ContentObject|undefined>(undefined);
    const [parentRemoteData, setParentRemoteData] = useState<ContentFolderObject|undefined>(undefined);
    const [reloadTrigger, setReloadTrigger] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const loadRemoteData = () => {
        setLoading(true);
        APIManager.content.getContent(contentID).then(res => {
            setRemoteData(res);
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
                        <>
                            <Stack
                                direction="row"
                                justifyContent="start"
                                alignContent="center"
                                sx={{
                                    width: 1
                                }}
                            >
                                <Typography
                                    level="h3"
                                >
                                    /
                                </Typography>
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
                        </>
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
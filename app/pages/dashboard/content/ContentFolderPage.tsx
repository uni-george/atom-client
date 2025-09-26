import { Box, CircularProgress, Divider, Stack, Typography, Link as MUILink, Modal, ModalDialog, DialogTitle, DialogContent, FormControl, FormLabel, Input, DialogActions, Button } from "@mui/joy";
import { Link, useNavigate } from "react-router";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { DashboardMainContent } from "../../../components/dashboard/DashboardMainContent/DashboardMainContent";
import type { ContentFolderObject } from "../../../managers/api/Content";
import APIManager from "../../../managers/APIManager";
import { ContentFolderActionBar } from "../../../components/dashboard/content/ContentFolderActionBar";
import { noResultsKaomoji } from "../../../util/noResultsKaomoji";
import { ContentSystemTable } from "../../../components/dashboard/content/ContentSystemTable";
import { AddRounded } from "@mui/icons-material";
import { NewContentModal } from "./NewContentModal";

export const ContentFolderPage = ({ folderID }: { folderID?: string }): ReactNode => {
    const [loading, setLoading] = useState<boolean>(true);
    const [folder, setFolder] = useState<ContentFolderObject|undefined>();
    const [childFolderLoading, setChildFolderLoading] = useState<ContentFolderObject[]>();
    // TODO: error display
    // @ts-ignore
    const [error, setError] = useState<any>();

    const [newFolderOpen, setNewFolderOpen] = useState<boolean>(false);
    const [newFolderName, setNewFolderName] = useState<string>("");

    const [newContentName, setNewContentName] = useState<string>("new content");
    const [newContentType, setNewContentType] = useState<"string" | "number">("string");
    const [newContentOpen, setNewContentOpen] = useState<boolean>(false);

    const navigate = useNavigate();

    const reset = () => {
        setLoading(true);
        setFolder(undefined);
    }

    const loadFolder = () => {
        APIManager.content.getFolder(folderID || "", true, true).then(res => {
            try {
                if (res) {
                    let loadingChildren = res.childFolders?.map(x => ({
                        id: x,
                        name: "test"
                    } as ContentFolderObject));

                    loadingChildren?.forEach(async (x, i, a) => {
                        let folderData = await APIManager.content.getFolder(x.id);
                        (loadingChildren?.[i] as ContentFolderObject).name = folderData?.name || "unknown folder";
                        if (i == a.length - 1) setChildFolderLoading(loadingChildren);
                    });
                }
            } catch (e) { console.log("eeeeeeeeeEEEEEEEEE") }
            setFolder(res);
        }).catch(e => {
            setError(e);
        }).finally(() => {
            setLoading(false);
        });
    }

    const openNewFolderModal = () => {
        if (!folder) return;
        setNewFolderName("new folder");
        setNewFolderOpen(true);
    }

    const openNewContentModal = () => {
        setNewContentName("new content");
        setNewContentType("string");
        setNewContentOpen(true);
    }

    const createNewFolder = async () => {
        if (!folder) return;
        try {
            setLoading(true);
            let createdFolder = await APIManager.content.createFolder(newFolderName, folder.id);
            if (!createdFolder) throw new Error("Could not create folder.");
            navigate(`/dashboard/content/folder/${encodeURIComponent(createdFolder.id)}`);
        } catch (e) {
            setLoading(false);
            setError(e);
        }
    }

    const createNewContent = async () => {
        setNewContentOpen(false);
        try {
            setLoading(true);
            let content = await APIManager.content.create({
                name: newContentName,
                type: newContentType,
                parentID: folder?.id
            });
            if (!content) throw new Error("Could not crate content.");
            navigate(`/dashboard/content/${encodeURIComponent(content.id)}`);
        } catch (e) {
            setLoading(false);
            setError(e);
        }
    }

    useEffect(() => {
        let clone = { ...folder } as ContentFolderObject;
        clone.childFolders = childFolderLoading;
        setFolder(clone);
    }, [childFolderLoading]);

    useEffect(() => {
        reset();
        loadFolder();
    }, [folderID]);



    return (
        <>
            <Divider />
            <DashboardMainContent>
                <NewContentModal 
                    open={newContentOpen}
                    createNewContent={createNewContent}
                    newContentName={newContentName}
                    setNewContentName={setNewContentName}
                    newContentType={newContentType}
                    setNewContentType={setNewContentType}
                    onClose={() => {
                        setNewContentOpen(false);
                    }}
                />

                <Modal
                    open={newFolderOpen}
                    onClose={() => setNewFolderOpen(false)}
                >
                    <ModalDialog>
                        <DialogTitle>new folder</DialogTitle>
                        <form
                            onSubmit={(e: FormEvent<HTMLFormElement>) => {
                                e.preventDefault();
                                setNewFolderOpen(false);
                                createNewFolder();
                            }}
                        >
                            <DialogContent>
                                <FormControl>
                                    <FormLabel>name</FormLabel>
                                    <Input
                                        autoFocus
                                        required
                                        value={newFolderName}
                                        onChange={e => setNewFolderName(e.target.value)}
                                    />
                                </FormControl>
                            </DialogContent>
                            <DialogActions>
                                <Button
                                    type="submit"
                                    startDecorator={
                                        <AddRounded />
                                    }
                                >
                                    submit
                                </Button>
                            </DialogActions>
                        </form>
                    </ModalDialog>
                </Modal>

                <Box
                    sx={{
                        width: 1
                    }}
                >
                    <ContentFolderActionBar
                        path={folder?.path}
                        onNewFolder={openNewFolderModal}
                        onNewContent={openNewContentModal}
                    />
                    {
                        loading ?
                            <Stack
                                justifyContent="center"
                                alignItems="center"
                                width={1}
                                height={300}
                            >
                                <CircularProgress />
                            </Stack>
                        : folder ? 
                            <>

                                <ContentSystemTable
                                    path={folder.path}
                                    folders={folder.childFolders as ContentFolderObject[]}
                                    content={folder.childContent || []}
                                    reload={() => {
                                        // TODO
                                    }}
                                />

                                <Typography
                                    sx={{
                                        pt: 1.5
                                    }}
                                    level="body-sm"
                                >
                                    folder ID: { folder.id }
                                </Typography>
                            </>
                        :
                        <Stack
                            sx={{
                                p: 3
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
                                unknown folder
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
                </Box>
            </DashboardMainContent>
        </>
    );
}
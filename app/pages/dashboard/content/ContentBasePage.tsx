import { Box, Button, CircularProgress, DialogActions, DialogContent, DialogTitle, Divider, FormControl, FormLabel, Input, Modal, ModalDialog, Stack } from "@mui/joy";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { DashboardMainContent } from "../../../components/dashboard/DashboardMainContent/DashboardMainContent";
import type { ContentFolderObject, ContentObject } from "../../../managers/api/Content";
import APIManager from "../../../managers/APIManager";
import { ContentSystemTable } from "../../../components/dashboard/content/ContentSystemTable";
import { ContentFolderActionBar } from "../../../components/dashboard/content/ContentFolderActionBar";
import { useNavigate } from "react-router";
import { AddRounded } from "@mui/icons-material";
import { NewContentModal } from "./NewContentModal";

export const ContentBasePage = (): ReactNode => {
    const [topLevel, setTopLevel] = useState<{ folders: ContentFolderObject[], content: ContentObject[] }|undefined>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>("");
    const [triggerReload, setTriggerReload] = useState<boolean>(false);
    const navigate = useNavigate();

    const [newFolderOpen, setNewFolderOpen] = useState<boolean>(false);
    const [newFolderName, setNewFolderName] = useState<string>("new folder");

    const [newContentName, setNewContentName] = useState<string>("new content");
    const [newContentType, setNewContentType] = useState<"string"|"number">("string");
    const [newContentOpen, setNewContentOpen] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        APIManager.content.getTopLevel().then(res => {
            setTopLevel(res);
        }).catch(e => {
            setError(e.message);
        }).finally(() => {
            setLoading(false);
        })
    }, [triggerReload]);

    const openNewFolderModal = () => {
        setNewFolderName("new folder");
        setNewFolderOpen(true);
    }

    const openNewContentModal = () => {
        setNewContentName("new content");
        setNewContentType("string");
        setNewContentOpen(true);
    }

    const createNewFolder = async () => {
        try {
            setLoading(true);
            let folder = await APIManager.content.createFolder(newFolderName);
            if (!folder) throw new Error("Could not create folder.");
            navigate(`/dashboard/content/folder/${encodeURIComponent(folder.id)}`);
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
                type: newContentType
            });
            if (!content) throw new Error("Could not crate content.");
            navigate(`/dashboard/content/${encodeURIComponent(content.id)}`);
        } catch (e) {
            setLoading(false);
            setError(e);
        }
    }

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
                            :
                            <ContentSystemTable
                                folders={topLevel?.folders || []}
                                content={topLevel?.content || []}
                                reload={() => {
                                    setTriggerReload(!triggerReload);
                                }}
                            />
                    }
                </Box>
            </DashboardMainContent>
        </>
    );
}
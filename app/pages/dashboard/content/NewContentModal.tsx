import { AddRounded } from "@mui/icons-material";
import { Button, DialogActions, DialogContent, DialogTitle, FormControl, FormLabel, Input, Modal, ModalDialog, Option, Select, Stack } from "@mui/joy";
import type { Dispatch, ReactNode, SetStateAction } from "react";

interface NewContentModalProps {
    open: boolean;
    onClose?: () => void;
    createNewContent?: () => void;
    newContentName?: string;
    setNewContentName?: Dispatch<SetStateAction<string>>;
    newContentType?: string;
    setNewContentType?: Dispatch<SetStateAction<"string"|"number">>;
}

export const NewContentModal = ({ open, onClose, createNewContent, newContentName, setNewContentName, newContentType, setNewContentType }: NewContentModalProps): ReactNode => {
    return (
        <Modal
            open={open}
            onClose={onClose}
        >
            <ModalDialog>
                <DialogTitle>new content</DialogTitle>
                <form
                    onSubmit={e => {
                        e.preventDefault();
                        onClose?.();
                        createNewContent?.();
                    }}
                >
                    <DialogContent>
                        <Stack
                            gap={2}
                        >
                            <FormControl>
                                <FormLabel>name</FormLabel>
                                <Input
                                    autoFocus
                                    required
                                    value={newContentName}
                                    onChange={e => setNewContentName?.(e.target.value)}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>type</FormLabel>
                                <Select
                                    value={newContentType}
                                    onChange={(_e, value) => setNewContentType?.(value as "string" | "number" || "string")}
                                >
                                    <Option value="string">text</Option>
                                    <Option value="number">numeric</Option>
                                </Select>
                            </FormControl>
                        </Stack>
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
    );
}
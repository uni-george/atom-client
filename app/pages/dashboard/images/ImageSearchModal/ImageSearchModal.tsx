import { SearchRounded } from "@mui/icons-material";
import { AspectRatio, Button, Card, CardContent, CardOverflow, CircularProgress, DialogActions, DialogContent, DialogTitle, Divider, FormControl, FormLabel, Grid, Input, Modal, ModalClose, ModalDialog, Sheet, Stack, Typography } from "@mui/joy";
import type React from "react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useTransitionState } from "react-transition-state";
import APIManager from "../../../../managers/APIManager";
import { useDebouncedCallback } from "use-debounce";
import { type ImageObject } from "../../../../managers/api/Image";

interface ImageSearchModalProps {
    open: boolean;
    onClose: ((event: {}, reason: "backdropClick" | "escapeKeyDown" | "closeClick") => void);
    image: string;
    setImage: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const ImageSearchModal = ({ open, onClose, image, setImage, ...other }: ImageSearchModalProps): ReactNode => {
    const [loading, setLoading] = useState<boolean>(true);
    const [animState, animToggle] = useTransitionState({ timeout: 200, preEnter: true });
    const [images, setImages] = useState<ImageObject[]>([]);

    const [searchName, setSearchName] = useState<string>("");

    const [selectedImageID, setSelectedImageID] = useState<string>(image);

    const nodeRef = useRef(null);

    const loadImages = useDebouncedCallback(() => {
        setLoading(true);

        APIManager.image.search().then(res => {
            setImages(res || []);
        }).finally(() => {
            setLoading(false);
        });
    }, 500, { leading: false });

    useEffect(() => {
        loadImages();
    }, [searchName]);

    useEffect(() => {
        animToggle(open);
    }, [open]);

    return (
        <Modal
            ref={nodeRef}
            keepMounted
            open={!["exited", "exiting"].includes(animState.status)}
            onClose={onClose}
            sx={[
                animState.status === "exited" ?
                    { visibility: "hidden" }
                :
                    { visibility: "visible" },
            ]}
            slotProps={{
                backdrop: {
                    sx: {
                        opacity: 0,
                        backdropFilter: "none",
                        transition: "opacity 200ms, backdrop-filter 200ms",
                        ...animState.status == "entered" || animState.status == "entering" ? {
                            opacity: 1,
                            backdropFilter: "blur(8px)"
                        } : { }
                    }
                }
            }}
            {...other}
        >
            <ModalDialog
                layout="center"
                variant="outlined"
                sx={{
                    opacity: 0,
                    transition: "opacity 300ms",
                    ...animState.status == "entered" || animState.status == "entering" ? {
                        opacity: 1
                    } : { },
                    width: {
                        xs: "100%",
                        md: "calc(100% - 32px)"
                    },
                    height: {
                        xs: "100%",
                        md: "calc(100% - 32px)"
                    },
                    maxWidth: {
                        md: 1300
                    },
                    maxHeight: {
                        md: 800
                    },
                    display: "flex"
                }}
            >
                <ModalClose />
                <DialogTitle>choose image</DialogTitle>
                <Divider />
                <Stack
                    direction="row"
                    sx={{
                        flexWrap: "wrap"
                    }}
                >
                    <FormControl
                        size="sm"
                    >
                        <FormLabel>image name</FormLabel>
                        <Input
                            size="sm"
                            placeholder="search"
                            value={searchName}
                            onChange={e => {
                                setSearchName(e.target.value);
                            }}
                            startDecorator={
                                <SearchRounded />
                            }
                        />
                    </FormControl>
                </Stack>
                <DialogContent>
                    {
                        loading ?
                        <CircularProgress />
                        :
                        <Sheet
                            variant="outlined"
                            sx={theme => ({
                                overflow: "hidden",
                                overflowY: "auto",
                                bgcolor: "background.surface",
                                height: 1,
                                p: 2,
                                borderRadius: theme.radius.md,
                                // borderTopRightRadius: 0,
                                // borderBottomRightRadius: 0
                            })}
                        >
                            <Grid
                                spacing={1}
                                container
                                columns={12}
                                // sx={{
                                //     margin: 0,
                                // }}
                            >
                                {
                                    images.length ? 
                                    images.map((x, i) => (
                                        <Grid
                                            
                                            key={`${x.id}-${i}`}
                                            sx={theme => ({
                                                "--Column-width": 12,
                                                [theme.breakpoints.up("sm")]: {
                                                    "--Column-width": 6
                                                },
                                                [theme.breakpoints.up("md")]: {
                                                    "--Column-width": 4
                                                },
                                                [theme.breakpoints.up("lg")]: {
                                                    "--Column-width": 3
                                                },
                                                width: "calc(100% * (var(--Column-width) / var(--Grid-columns)))"
                                            })}
                                        >
                                            <ImageCard
                                                image={x}
                                                onClick={e => {
                                                    setSelectedImageID(x.id);
                                                }}
                                                selected={selectedImageID == x.id}
                                            />
                                        </Grid>
                                    ))
                                    : 
                                    <h1>replace this message</h1>
                                }
                            </Grid>
                        </Sheet>
                    }
                </DialogContent>
                <Divider
                    sx={{
                        mt: 1,
                        mb: -0.5
                    }}
                />
                <DialogActions>
                    <Button
                        onClick={e => {
                            setImage(selectedImageID);
                            onClose(e, "closeClick");
                        }}
                    >
                        confirm
                    </Button>
                    <Button
                        color="neutral"
                        variant="outlined"
                        onClick={e => {
                            setSelectedImageID(image);
                            onClose(e, "escapeKeyDown");
                        }}
                    >
                        cancel
                    </Button>
                </DialogActions>
            </ModalDialog>
        </Modal>
    );
}

const ImageCard = ({ image, onClick, selected = false }: { image: ImageObject, onClick?: React.MouseEventHandler<HTMLDivElement | undefined>, selected?: boolean }): ReactNode => {
    return (
        <Card
            variant={selected ? "solid" : "outlined"}
            onClick={onClick}
            invertedColors
            color={selected ? "primary" : "neutral"}
            sx={{
                transition: "background 150ms",
                "&:hover": {
                    cursor: "pointer",
                    bgcolor: selected ? "primary.softActiveColor" : "neutral.outlinedHoverBg"
                },
                border: "1px solid",
                borderColor: selected ? "primary.outlinedBorder" : "neutral.outlinedBorder"
            }}
        >
            <CardOverflow>
                <AspectRatio
                    ratio="2"
                >
                    <img
                        src={image.url}
                        loading="lazy"
                        alt={image.id}
                    />
                </AspectRatio>
            </CardOverflow>
            <CardContent>
                <Typography
                    level="title-md"
                >
                    { image.id }
                </Typography>
            </CardContent>
        </Card>
    );
}
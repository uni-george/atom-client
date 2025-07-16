import { SearchRounded } from "@mui/icons-material";
import { AspectRatio, Button, Card, CardContent, CardOverflow, CircularProgress, DialogActions, DialogContent, DialogTitle, Divider, FormControl, FormLabel, Grid, Input, Modal, ModalClose, ModalDialog, Option, Select, Sheet, Stack, Typography } from "@mui/joy";
import type React from "react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useTransitionState } from "react-transition-state";
import APIManager from "../../../../managers/APIManager";
import { useDebouncedCallback } from "use-debounce";
import { type ImageObject, type ImageSearchParams } from "../../../../managers/api/Image";
import { Paginator } from "../../../../components/Paginator/Paginator";
import { noResultsKaomoji } from "../../../../util/noResultsKaomoji";
import { GridCell } from "../../../../components/GridCell/GridCell";

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
    const [imageCount, setImageCount] = useState<number>(0);
    const [page, setPage] = useState<number>(1);
    const [noResultsIndex, setNoResultsIndex] = useState<number>(0);

    const [searchName, setSearchName] = useState<string>("");
    const [selectedImageID, setSelectedImageID] = useState<string>(image);
    const [resultsPerPage, setResultsPerPage] = useState<number>(10);

    const nodeRef = useRef(null);

    const loadImages = useDebouncedCallback(async () => {
        setLoading(true);

        setNoResultsIndex(Math.floor(Math.random() * noResultsKaomoji.length));
        let params: ImageSearchParams = {
            name: searchName || undefined,
            offset: resultsPerPage * (page - 1),
            limit: resultsPerPage,
            internal: Boolean(searchName)
        }

        let res = await APIManager.image.search(params);
        setImages(res || []);
        let count = await APIManager.image.count(params);
        setImageCount(count || 0);

        setLoading(false);
    }, 500, { leading: false });

    useEffect(() => {
        loadImages();
    }, [searchName, resultsPerPage, page]);

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
                    gap={2}
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
                    <FormControl
                        size="sm"
                    >
                        <FormLabel>images per page</FormLabel>
                        <Select
                            size="sm"
                            slotProps={{
                                button: {
                                    sx: {
                                        whiteSpace: "nowrap"
                                    }
                                }
                            }}
                            value={resultsPerPage}
                            onChange={(_e, newValue) => {
                                setResultsPerPage(newValue || 10);
                            }}
                        >
                            <Option value={5}>5</Option>
                            <Option value={10}>10</Option>
                            <Option value={15}>15</Option>
                            <Option value={20}>20</Option>
                            <Option value={25}>25</Option>
                        </Select>
                    </FormControl>
                </Stack>
                <DialogContent>
                    {
                        loading ?
                            <Stack
                                justifyContent="center"
                                alignItems="center"
                                height={1}
                            >
                                <CircularProgress />
                            </Stack>
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
                                    "--sb-track-color": "transparent",
                                    "--sb-border-color": "var(--atom-palette-background-surface)"
                                    // borderTopRightRadius: 0,
                                    // borderBottomRightRadius: 0
                                })}
                            >
                                <Grid
                                    spacing={1}
                                    container
                                    columns={12}
                                >
                                    {
                                        images.length ? 
                                        images.map((x, i) => (
                                            <GridCell
                                                key={`${x.id}-${i}`}
                                                size={{
                                                    xs: 12,
                                                    sm: 6,
                                                    md: 4,
                                                    lg: 3
                                                }}
                                            >
                                                <ImageCard
                                                    image={x}
                                                    tabIndex={i + 1}
                                                    onClick={() => {
                                                        setSelectedImageID(x.id);
                                                    }}
                                                    selected={selectedImageID == x.id}
                                                />
                                            </GridCell>
                                        ))
                                        : 
                                        <GridCell
                                            size={12}
                                        >
                                            <Stack
                                                sx={{
                                                    p: 3,
                                                    w: 1
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        textAlign: "center",
                                                        mb: 2
                                                    }}
                                                    level="h3"
                                                    textColor="text.tertiary"
                                                    component="code"
                                                >
                                                    {
                                                        noResultsKaomoji[noResultsIndex]
                                                    }
                                                </Typography>
                                                <Typography
                                                    sx={{
                                                        textAlign: "center"
                                                    }}
                                                    level="body-md"
                                                    textColor="text.tertiary"
                                                >
                                                    no images
                                                </Typography>
                                            </Stack>
                                        </GridCell>
                                    }
                                </Grid>
                            </Sheet>
                    }
                </DialogContent>
                {
                    Math.ceil(imageCount / resultsPerPage) > 1 &&
                    <Paginator
                        page={page}
                        setPage={setPage}
                        numPages={Math.ceil(imageCount / resultsPerPage)}
                        disableSearchParams
                        includeButtons
                        sx={{
                            mt: 1
                        }}
                    />
                }
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

const ImageCard = ({ image, onClick, selected = false, tabIndex }: { image: ImageObject, onClick?: React.MouseEventHandler<HTMLButtonElement | undefined>, selected?: boolean, tabIndex?: number }): ReactNode => {
    return (
        <Card
            variant={selected ? "solid" : "outlined"}
            onClick={onClick}
            invertedColors
            color={selected ? "primary" : "neutral"}
            sx={{
                width: 1,
                textAlign: "left",
                transition: "background 150ms",
                "&:hover": {
                    cursor: "pointer",
                    bgcolor: selected ? "primary.softHoverBg" : "neutral.outlinedHoverBg"
                },
                border: "1px solid",
                borderColor: selected ? "primary.outlinedBorder" : "neutral.outlinedBorder"
            }}
            component="button"
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
import React, { useContext, useEffect, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";
import type { User } from "../../../../types/user";
import { DashboardHeaderTabs } from "../../../components/dashboard/DashboardHeaderTabs/DashboardHeaderTabs";
import { Avatar, Box, Button, Card, CardActions, CircularProgress, DialogContent, DialogTitle, Divider, FormControl, FormHelperText, FormLabel, Grid, Input, LinearProgress, Link, Modal, ModalClose, ModalDialog, Sheet, Stack, Tab, TabPanel, Typography } from "@mui/joy";
import { DashboardMainContent } from "../../../components/dashboard/DashboardMainContent/DashboardMainContent";
import { ErrorCard } from "../../../components/ErrorCard/ErrorCard";
import { useNavigate } from "react-router";
import { ArrowBackRounded, DeleteForeverRounded, EditRounded, InfoOutlineRounded } from "@mui/icons-material";
import APIManager from "../../../managers/APIManager";
import { AuthGuardUserContext, SetAuthGuardUserContext } from "../../../context/AuthGuardUserContext";
import { ImageSearchModal } from "../images/ImageSearchModal/ImageSearchModal";
import { GridCell } from "../../../components/GridCell/GridCell";
import { randomString } from "../../../util/randomString";

interface SingleUserPageProps {
    user?: User;
    canEdit: boolean;
    isManager: boolean;
    refreshUser: boolean;
    setRefreshUser: Dispatch<SetStateAction<boolean>>;
}

export const SingleUserPage = ({ user, canEdit, isManager, refreshUser, setRefreshUser }: SingleUserPageProps): ReactNode => {
    const navigate = useNavigate();

    if (!user) {
        return (
            <Stack
                justifyContent="center"
                alignItems="center"
                height="100%"
            >
                <DashboardMainContent>
                    <ErrorCard
                        title="unknown user :("
                        color="warning"
                        code="ERR_UNKNOWN_ID"
                    >
                        <Typography
                            level="body-md"
                        >
                            unfortunately i can't find a user with this ID.
                        </Typography>
                        <Link
                            startDecorator={
                                <ArrowBackRounded />
                            }
                            onClick={e => {
                                e.preventDefault();
                                navigate(-1);
                            }}
                            sx={{
                                mt: 1
                            }}
                        >
                            go back
                        </Link>
                    </ErrorCard>
                </DashboardMainContent>
            </Stack>
        );
    }

    if (isManager) {
        return (
            <DashboardHeaderTabs
                defaultValue={0}
                tabListContent={[
                    <Tab value={0} indicatorInset>profile</Tab>,
                    <Tab value={1} indicatorInset>groups</Tab>,
                    <Tab value={2} indicatorInset>permissions</Tab>,
                ]}
            >
                <DashboardMainContent>
                    <TabPanel
                        value={0}
                    >
                        <ProfileTab
                            canEdit={canEdit}
                            user={user}
                            refreshUser={refreshUser}
                            setRefreshUser={setRefreshUser}
                        />
                    </TabPanel>
                    <TabPanel
                        value={1}
                    >
                        <h1>group stuff</h1>
                    </TabPanel>
                    <TabPanel
                        value={2}
                    >
                        <h1>permission stuff</h1>
                    </TabPanel>
                </DashboardMainContent>
            </DashboardHeaderTabs>
        );
    }

    return (
        <>
            <Divider />
            <DashboardMainContent>
                <ProfileTab
                    canEdit={canEdit}
                    user={user}
                    refreshUser={refreshUser}
                    setRefreshUser={setRefreshUser}
                />
            </DashboardMainContent>
        </>
    );
}

interface ProfileTabProps {
    user: User;
    canEdit: boolean;

    refreshUser: boolean;
    setRefreshUser: Dispatch<SetStateAction<boolean>>;
}

const ProfileTab = ({ user, canEdit, refreshUser, setRefreshUser }: ProfileTabProps): ReactNode => {
    const [avatarID, setAvatarID] = useState<string | undefined>(user?.avatarID);
    const [name, setName] = useState<string>(user?.name || "unnamed user");

    return (
        <Stack
            gap={3}
            maxWidth={1}
            width={1}
        >
            <DisplayInfo
                user={user}
                canEdit={canEdit}
                name={name}
                setName={setName}
                avatarID={avatarID}
                setAvatarID={setAvatarID}
                refreshUser={refreshUser}
                setRefreshUser={setRefreshUser}
            />

            <SystemInfo
                user={user}
            />

            <Divider />

            <DangerZone
                user={user}
            />
        </Stack>
    );
}

interface DisplayInfoProps {
    user: User;
    canEdit: boolean;
    name: string;
    setName: React.Dispatch<React.SetStateAction<string>>;
    avatarID: string|undefined;
    setAvatarID: React.Dispatch<React.SetStateAction<string|undefined>>;

    refreshUser: boolean;
    setRefreshUser: Dispatch<SetStateAction<boolean>>;
}

const DisplayInfo = ({ user, canEdit, name, setName, avatarID, setAvatarID, refreshUser, setRefreshUser }: DisplayInfoProps): ReactNode => {
    const [currentAvatar, setCurrentAvatar] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [submitError, setSubmitError] = useState<string|undefined>(undefined);

    const [avatarChooseModalOpen, setAvatarChooseModalOpen] = useState<boolean>(false);
    const reqUser = useContext(AuthGuardUserContext);
    const setReqUser = useContext(SetAuthGuardUserContext);

    useEffect(() => {
        APIManager.image.getURL(avatarID || "").then(x => {
            setCurrentAvatar(x || "");
        });
    }, [avatarID]);

    const isMe = user.id == reqUser?.id;

    const submit = () => {
        setIsSubmitting(true);

        APIManager.user.update({
            id: user.id,
            name: name,
            avatarID: avatarID
        }).then(x => {
            if (isMe) {
                setReqUser?.(x);
            }
        }).catch(e => {
            setSubmitError(e);
        }).finally(() => {
            setRefreshUser(!refreshUser);
            setIsSubmitting(false);
        })
    }

    const displayInfoModificationMade = (): boolean => {
        return canEdit && (name != user.name || avatarID != user.avatarID);
    }

    const resetDisplayInfo = () => {
        setName(user.name);
        setAvatarID(user.avatarID);
    }

    const elementOpacity = isSubmitting ? 0.7 : 1;

    return (
        <form
            onSubmit={e => {
                e.preventDefault();
                submit();
            }}
        >
            <ImageSearchModal 
                open={avatarChooseModalOpen}
                image={avatarID || ""}
                setImage={setAvatarID}
                onClose={() => {
                    setAvatarChooseModalOpen(false);
                }}
            />
            <Card
                sx={{
                    width: 1,
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                {
                    isSubmitting &&
                    <Stack
                        justifyContent="center"
                        alignItems="center"
                        sx={{
                            position: "absolute",
                            width: 1,
                            height: 1,
                            top: 0,
                            left: 0,
                            zIndex: 999,
                            bgcolor: "background.backdrop",
                            backgroundClip: "padding-box",
                            p: 1
                        }}
                    >
                        <LinearProgress
                            sx={{
                                width: 0.8,
                                flexGrow: "inherit"
                            }}
                        />
                    </Stack>
                }
                <Box
                    sx={{
                        opacity: elementOpacity
                    }}
                >
                    <Typography
                        level="title-md"
                    >
                        display info
                    </Typography>
                    <Typography
                        level="body-sm"
                    >
                        {canEdit ? "customise" : null} how {isMe ? "you" : "the user will"} appear to other atom users.
                    </Typography>
                </Box>
                <Divider
                    sx={{
                        my: 1
                    }}
                />
                <Stack
                    sx={{
                        opacity: elementOpacity
                    }}
                    maxWidth={1}
                >
                    <Stack
                        direction={{
                            xs: "column",
                            sm: "row"
                        }}
                        maxWidth={1}
                        alignItems="center"
                        gap={2}
                    >
                        <Box
                            sx={{
                                position: "relative"
                            }}
                        >
                            <Avatar
                                src={currentAvatar}
                                sx={{
                                    width: 128,
                                    aspectRatio: "1",
                                    height: "auto"
                                }}
                            >
                                <Box
                                    sx={{
                                        scale: 128 / 32
                                    }}
                                >
                                    {user.name.slice(0, 1)?.toUpperCase()}
                                </Box>
                            </Avatar>
                            {
                                canEdit &&
                                <Box
                                    sx={{
                                        position: "absolute",
                                        bottom: "1%",
                                        right: "1%",
                                        bgcolor: "text.primary",
                                        padding: 0.5,
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        border: "5px solid",
                                        borderColor: "background.surface",
                                        borderRadius: "50%",
                                        cursor: "pointer",
                                        "&& > *": {
                                            color: "background.body"
                                        },
                                        "&:hover": {
                                            bgcolor: "text.secondary"
                                        }
                                    }}
                                    component="button"
                                    type="button"
                                    onClick={() => {
                                        setAvatarChooseModalOpen(true);
                                    }}
                                >
                                    <EditRounded
                                        sx={{
                                            fontSize: 24
                                        }}
                                    />
                                </Box>
                            }
                        </Box>
                        <FormControl>
                            <FormLabel>display name</FormLabel>
                            {
                                canEdit ?
                                    <Input
                                        value={name}
                                        onChange={e => {
                                            setName(e.target.value)
                                        }}
                                        name="displayName"
                                    />
                                :
                                    <Box
                                        sx={{
                                            width: {
                                                xs: 1,
                                                sm: "calc(100% - 16px - 128px)"
                                            }
                                        }}
                                    >
                                        <Typography
                                            level="body-lg"
                                            noWrap
                                        >
                                            {name}
                                        </Typography>
                                    </Box>
                            }
                            <FormHelperText>this name is shown to other logged-in users</FormHelperText>
                        </FormControl>
                    </Stack>
                </Stack>
                {
                    submitError &&
                    <Typography
                        level="body-sm"
                        color="danger"
                    >
                        couldn't submit display info: { submitError }
                    </Typography>
                }

                {
                    canEdit &&
                    <Divider
                        sx={{
                            my: 1
                        }}
                    />
                }
                {
                    canEdit &&
                    <CardActions
                        buttonFlex="0 1 120px"
                        sx={{
                            justifyContent: "end",
                            opacity: elementOpacity
                        }}
                    >
                        <Button
                            variant="outlined"
                            color="neutral"
                            disabled={!displayInfoModificationMade()}
                            onClick={resetDisplayInfo}
                        >
                            cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={!displayInfoModificationMade()}
                        >
                            save
                        </Button>
                    </CardActions>
                }
            </Card>
        </form>
    );
}

const SystemInfo = ({ user }: { user: User }): ReactNode => {
    const reqUser = useContext(AuthGuardUserContext);
    const isMe = reqUser?.id == user.id;

    return (
        <Card
            sx={{
                width: 1,
                overflow: "hidden"
            }}
        >
            <Box>
                <Typography
                    level="title-md"
                >
                    system info
                </Typography>
                <Typography
                    level="body-sm"
                >
                    check info stored about {isMe ? "your" : "this"} user account.
                </Typography>
            </Box>
            <Divider />
            <Grid
                columns={12}
                container
                spacing={1}
            >
                <GridCell
                    size={{
                        xs: 12,
                        sm: 6,
                        lg: 4
                    }}
                >
                    <FormControl>
                        <FormLabel>id</FormLabel>
                        <Input
                            value={user.id}  
                        />
                        <FormHelperText>this number is unique to your account. it cannot be changed.</FormHelperText>
                    </FormControl>
                </GridCell>
            </Grid>
        </Card>
    );
}

const DangerZone = ({ user }: { user: User }): ReactNode => {
    const reqUser = useContext(AuthGuardUserContext);
    const isMe = reqUser?.id == user.id;
    const [confirmationString, setConfirmationString] = useState<string>("");
    const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
    const [input, setInput] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [deleteError, setDeleteError] = useState<any>("");
    const navigate = useNavigate();

    useEffect(() => {
        setConfirmationString(randomString(7));
    }, []);

    const deleteAccount = async () => {
        setLoading(true);
        APIManager.user.delete(user.id).then(x => {
            if (x) navigate(-1);
        }).catch(e => {
            setDeleteError(e);
        }).finally(() => {
            setLoading(false);
        });
    }

    return (
        <Card
            color="danger"
            sx={{
                width: 1
            }}
        >
            <Modal
                open={deleteOpen}
                onClose={() => {
                    setDeleteOpen(false)
                }}
            >
                {
                    loading ?
                        <Stack
                            alignItems="center"
                            justifyContent="center"
                            height={1}
                        >
                            <Sheet
                                variant="outlined"
                                sx={{
                                    p: 4,
                                    height: 130,
                                    borderRadius: "50%"
                                }}
                            >
                                <CircularProgress
                                    size="lg"
                                />
                            </Sheet>
                        </Stack>
                    :
                        <ModalDialog
                            maxWidth={400}
                        >
                            <DialogTitle>delete account</DialogTitle>
                            <ModalClose />
                            <Divider />
                            <DialogContent>
                                <Typography
                                    sx={{
                                        mb: 1
                                    }}
                                >
                                    continuing will <b><u>permanently</u></b> delete this account.
                                </Typography>
                                <Typography>
                                    to confirm you wish to delete this account, please type the following in the box below: <b>{ confirmationString }</b>
                                </Typography>
                            </DialogContent>
                            <Divider />
                            <FormControl
                                error={Boolean(deleteError)}
                            >
                                <FormLabel>confirmation code</FormLabel>
                                <Input
                                    value={input}
                                    onChange={e => {
                                        setInput(e.target.value);
                                    }}
                                />
                                {
                                    deleteError &&
                                    <FormHelperText
                                        sx={{
                                            textTransform: "lowercase"
                                        }}
                                    >
                                        <InfoOutlineRounded
                                            sx={{
                                                mr: 1
                                            }}
                                        />
                                        couldn't delete account:{" "}
                                        { deleteError?.message || deleteError || "unknown issue" }
                                    </FormHelperText>
                                }
                            </FormControl>
                            <Button
                                color="danger"
                                startDecorator={
                                    <DeleteForeverRounded />
                                }
                                disabled={input != confirmationString}
                                sx={{
                                    transition: "background 0.2s, opacity 0.2s, color 0.2s"
                                }}
                                onClick={() => {
                                    deleteAccount();
                                }}
                            >
                                delete permanently
                            </Button>
                        </ModalDialog>
                }
            </Modal>
            <Box>
                <Typography
                    level="title-md"
                >
                    danger zone
                </Typography>
                <Typography
                    level="body-sm"
                >
                    settings that can make large modifications to { isMe ? "your" : "this" } account.
                </Typography>
            </Box>
            <Divider />
            <Stack
                direction="column"
            >
                <FormControl>
                    <Button
                        color="danger"
                        startDecorator={
                            <DeleteForeverRounded />
                        }
                        fullWidth
                        onClick={() => {
                            setDeleteOpen(true);
                        }}
                    >
                        delete user
                    </Button>
                    <FormHelperText>
                        <Typography
                            level="body-xs"
                        >
                            this action is permanent and cannot be undone.
                        </Typography>
                    </FormHelperText>
                </FormControl>
            </Stack>
        </Card>
    );
}
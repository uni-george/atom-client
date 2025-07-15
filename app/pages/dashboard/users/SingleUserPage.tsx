import React, { useContext, useEffect, useState, type ReactNode } from "react";
import type { User } from "../../../../types/user";
import { DashboardHeaderTabs } from "../../../components/dashboard/DashboardHeaderTabs/DashboardHeaderTabs";
import { Avatar, Box, Button, Card, CardActions, Divider, FormControl, FormHelperText, FormLabel, Input, LinearProgress, Link, Stack, Tab, TabPanel, textareaClasses, Typography } from "@mui/joy";
import { DashboardMainContent } from "../../../components/dashboard/DashboardMainContent/DashboardMainContent";
import { ErrorCard } from "../../../components/ErrorCard/ErrorCard";
import { useNavigate } from "react-router";
import { ArrowBackRounded, EditRounded } from "@mui/icons-material";
import APIManager from "../../../managers/APIManager";
import { AuthGuardUserContext } from "../../../context/AuthGuardUserContext";
import { ImageSearchModal } from "../images/ImageSearchModal/ImageSearchModal";

interface SingleUserPageProps {
    user?: User;
    canEdit: boolean;
    isManager: boolean;
}

export const SingleUserPage = ({ user, canEdit, isManager }: SingleUserPageProps): ReactNode => {
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
                />
            </DashboardMainContent>
        </>
    );
}

interface ProfileTabProps {
    user: User,
    canEdit: boolean
}

const ProfileTab = ({ user, canEdit }: ProfileTabProps): ReactNode => {
    const [avatarID, setAvatarID] = useState<string | undefined>(user?.avatarID);
    const [name, setName] = useState<string>(user?.name || "unnamed user");

    return (
        <Stack
            gap={2}
            maxWidth={1}
        >
            <DisplayInfo
                user={user}
                canEdit={canEdit}
                name={name}
                setName={setName}
                avatarID={avatarID}
                setAvatarID={setAvatarID}
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
}

const DisplayInfo = ({ user, canEdit, name, setName, avatarID, setAvatarID }: DisplayInfoProps): ReactNode => {
    const [currentAvatar, setCurrentAvatar] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [submitError, setSubmitError] = useState<string|undefined>(undefined);

    const [avatarChooseModalOpen, setAvatarChooseModalOpen] = useState<boolean>(false);

    useEffect(() => {
        console.log("hereeeeeee")
        APIManager.image.getURL(avatarID || "").then(x => {
            console.log(x);
            setCurrentAvatar(x || "");
        });
    }, [avatarID]);

    const submit = () => {
        setIsSubmitting(true);
    }

    const reqUser = useContext(AuthGuardUserContext);
    const isMe = user.id == reqUser?.id;

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
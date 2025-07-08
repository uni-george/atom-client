import { useEffect, useState, type PropsWithChildren, type ReactNode } from "react";
import type { User } from "../../../../types/user";
import { DashboardHeaderTabs } from "../../../components/dashboard/DashboardHeaderTabs/DashboardHeaderTabs";
import { Avatar, Box, Card, Divider, Link, Stack, Tab, TabPanel, Typography } from "@mui/joy";
import { DashboardMainContent } from "../../../components/dashboard/DashboardMainContent/DashboardMainContent";
import { ErrorCard } from "../../../components/ErrorCard/ErrorCard";
import { useNavigate } from "react-router";
import { ArrowBackRounded } from "@mui/icons-material";
import APIManager from "../../../managers/APIManager";

interface SingleUserPageProps {
    user?: User;
    canEdit: boolean;
    isManager: boolean;
}

interface OuterBitProps {
    groups: ReactNode;
    permissions: ReactNode;
}

export const SingleUserPage = ({ user, canEdit, isManager }: SingleUserPageProps): ReactNode => {
    const navigate = useNavigate();

    const [currentAvatar, setCurrentAvatar] = useState<string|undefined>(undefined);

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

    useEffect(() => {
        APIManager.image.getURL(user.avatarID || "").then(x => {
            setCurrentAvatar(x);
        });
    }, [user]);

    const OuterBit = ({ children, groups, permissions }: PropsWithChildren<OuterBitProps>): ReactNode => {
        if (isManager) {
            return (
                <DashboardHeaderTabs
                    defaultValue={0}
                    tabListContent={
                        <>
                            <Tab value={0} indicatorInset>profile</Tab>
                            <Tab value={1} indicatorInset>groups</Tab>
                            <Tab value={2} indicatorInset>permissions</Tab>
                        </>
                    }
                >
                    <DashboardMainContent>
                        <TabPanel
                            value={0}
                        >
                            { children }
                        </TabPanel>
                        <TabPanel
                            value={1}
                        >
                            { groups }
                        </TabPanel>
                        <TabPanel
                            value={2}
                        >
                            { permissions }
                        </TabPanel>
                    </DashboardMainContent>
                </DashboardHeaderTabs>
            );
        }

        return (
            <>
                <Divider />
                <DashboardMainContent>
                    { children }
                </DashboardMainContent>
            </>
        );
    }

    return (
        <OuterBit
            groups={
                <h1>group stuff here</h1>
            }
            permissions={
                <h1>permission stuff here</h1>
            }
        >
            <Card>
                <Box>
                    <Typography
                        level="title-md"
                    >
                        display info
                    </Typography>
                    <Typography
                        level="body-sm"
                    >
                        customise how you appear to other atom users.
                    </Typography>
                </Box>
                <Divider
                    sx={{
                        my: 1
                    }}
                />
                <Stack>
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
                </Stack>
            </Card>
        </OuterBit>
    );
}
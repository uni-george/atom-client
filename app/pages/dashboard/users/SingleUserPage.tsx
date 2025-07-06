import type { ReactNode } from "react";
import type { User } from "../../../../types/user";
import { DashboardHeaderTabs } from "../../../components/dashboard/DashboardHeaderTabs/DashboardHeaderTabs";
import { Link, Stack, Tab, TabPanel, Typography } from "@mui/joy";
import { DashboardMainContent } from "../../../components/dashboard/DashboardMainContent/DashboardMainContent";
import { ErrorCard } from "../../../components/ErrorCard/ErrorCard";
import { useNavigate } from "react-router";
import { ArrowBackRounded } from "@mui/icons-material";

interface SingleUserPageProps {
    user?: User;
}

export const SingleUserPage = ({ user }: SingleUserPageProps): ReactNode => {
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
                    this is a profile
                </TabPanel>
            </DashboardMainContent>
        </DashboardHeaderTabs>
    );
}
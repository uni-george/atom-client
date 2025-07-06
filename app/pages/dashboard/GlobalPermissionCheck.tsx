import { useEffect, useState, type PropsWithChildren, type ReactNode } from "react";
import { GlobalPermissions, type GlobalPermissionsObject } from "../../managers/api/Permission";
import APIManager from "../../managers/APIManager";
import { LinearProgress, Sheet, Stack, Typography } from "@mui/joy";
import { ErrorCard } from "../../components/ErrorCard/ErrorCard";
import { useNavigate } from "react-router";

interface GlobalPermissionCheckProps {
    permissions: GlobalPermissions[];
    centerVertically?: boolean;
    redirect?: string;
}

export const GlobalPermissionCheck = ({ permissions, centerVertically, redirect: redirectURL, children }: PropsWithChildren<GlobalPermissionCheckProps>): ReactNode => {
    const [apiPermissions, setAPIPermissions] = useState<GlobalPermissionsObject|undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true);
    const [passed, setPassed] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        APIManager.permission.me().then(res => {
            setAPIPermissions(res);
        }).catch(() => {
            throw new Error("Server could not be accessed.")
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        if (apiPermissions) {
            if (permissions.every(x => (
                apiPermissions[x] || false
            ))) setPassed(true);
            else setPassed(false);
        }
    }, [apiPermissions]);

    if (!loading && !passed && redirectURL) {
        navigate(redirectURL);
    }

    if (loading || !passed) {
        return (
            <Stack
                justifyContent="center"
                alignItems="center"
                width="100%"
                height={centerVertically ? "100%" : "unset"}
            >
                {
                    loading ? 
                    <LoadingBox />
                    :
                    <ErrorCard
                        title="no access"
                        sx={{
                            maxWidth: "400px"
                        }}
                        code="ERR_INSUFFICIENT_PERMISSION"
                    >
                        <Typography>
                            apologies, but you don't have the sufficient permissions to access this feature. if you think this is a mistake, please contact an administrator.
                        </Typography>
                    </ErrorCard>
                }
            </Stack>
        );
    }

    if (!passed) {

    }

    return children;
}

const LoadingBox = (): ReactNode => {
    return (

        <Sheet
            variant="outlined"
            sx={{
                p: 2,
                borderRadius: theme => theme.radius.md
            }}
        >
            <Stack
                direction="column"
                alignItems="center"
                gap={2}
            >
                <Typography
                    level="body-xs"
                    sx={{
                        "&::after": {
                            content: "'\\2026'",
                            display: "inline-block",
                            verticalAlign: "bottom",
                            overflow: "hidden",
                            animation: "ellipsis steps(4, end) 1500ms infinite",
                            width: 0
                        },
                        "@keyframes ellipsis": {
                            to: {
                                width: "12px"
                            }
                        }
                    }}
                >
                    checking permissions
                </Typography>
                <LinearProgress
                    sx={{
                        minWidth: "130px"
                    }}
                />
            </Stack>
        </Sheet>
    );
}
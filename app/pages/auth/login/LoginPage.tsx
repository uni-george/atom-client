import { Alert, CircularProgress, Stack, Typography, Link as MUILink, Button, Divider } from "@mui/joy";
import { useEffect, useState, type PropsWithChildren, type ReactNode } from "react";
import type { LoginType } from "../../../managers/api/Auth";
import APIManager from "../../../managers/APIManager";
import { Google, Refresh, Report, Warning } from "@mui/icons-material";
import { Link, useSearchParams } from "react-router";
import interleave from "../../../util/interleave";
import { LocalLogin } from "../../../components/auth/LocalLogin";
import { Small } from "../../../components/Small/Small";

export const LoginPage = (): ReactNode => {
    const [allowedMethods, setAllowedMethods] = useState<LoginType[]>();
    const [methodLoadError, setMethodLoadError] = useState<any>(undefined);
    const [loadingMethods, setLoadingMethods] = useState<boolean>(true);
    const [accountRequestsOpen, setAccountRequestsOpen] = useState<boolean>(false);
    const [loadingAccountRequestsOpen, setLoadingAccountRequestsOpen] = useState<boolean>(true);

    const attemptLoad = () => {
        APIManager.auth.getLoginTypes().then(types => {
            if (types?.length) {
                setAllowedMethods(types);
            } else {
                setMethodLoadError("noconfigset");
            }
            setLoadingMethods(false);
        }).catch(e => {
            setMethodLoadError(e);
            setLoadingMethods(false);
        });
        
        APIManager.auth.getAccountRegistrationOpen().then(open => {
            if (open) setAccountRequestsOpen(open);
        }).finally(() => {
            setLoadingAccountRequestsOpen(false);
        });
    }

    const resetLoadingState = () => {
        setAllowedMethods(undefined);
        setMethodLoadError(undefined);
        setLoadingMethods(true);
        setAccountRequestsOpen(false);
        setLoadingAccountRequestsOpen(true);
    }

    useEffect(() => {
        attemptLoad();
    }, []);

    const isLoading = () => [
        loadingMethods,
        loadingAccountRequestsOpen

    ].some(x => x);

    if (isLoading()) {
        return (
            <Stack
                direction="row"
                justifyContent="center"
            >
                <CircularProgress
                    variant="soft"
                />
            </Stack>
        );
    }

    if (methodLoadError) {
        return (
            <Stack
                direction="column"
                gap={4}
            >
                <div>
                    <Alert
                        startDecorator={<Warning />}
                        variant="outlined"
                        color="danger"
                    >
                        <div>
                            can't load login configuration
                            <Typography
                                level="body-sm"
                                component="div"
                            >
                                i can't seem to load the login settings. please check your internet connection, or contact the owner of this instance of atom.
                            </Typography>
                        </div>
                    </Alert>
                    <Small
                        sx={{
                            mt: 1
                        }}
                    >
                        ERR_NO_SERVER_LOGIN_CONFIGS
                    </Small>
                </div>
                <Button
                    size="sm"
                    color="primary"
                    startDecorator={
                        <Refresh />
                    }
                    onClick={() => {
                        resetLoadingState();
                        attemptLoad();
                    }}
                >
                    retry
                </Button>
            </Stack>
        );
    }

    return (
        <Stack
            sx={{
                gap: 4,
            }}
        >
            <Stack
                sx={{
                    gap: 1
                }}
            >
                <Typography
                    component="h1"
                    level="h3"
                >
                    sign in
                </Typography>
                {
                    accountRequestsOpen ?
                    <Typography
                        level="body-sm"
                        component="div"
                    >
                        don't have an account?{" "}
                        <Link
                            to="/signup"
                        >
                            <MUILink component="div">
                                request one here!
                            </MUILink>
                        </Link>
                    </Typography>
                    :
                    null
                }
            </Stack>
            {
                interleave([...new Set(allowedMethods)]?.map(x => {
                    switch(x) {
                    case "google":
                        return (
                            <LoginErrorAlert method={x}>
                                <Button
                                    key={x}
                                    variant="soft"
                                    color="neutral"
                                    fullWidth
                                    startDecorator={<Google />}
                                    onClick={() => {
                                        document.location.href = "/auth/login/google"
                                    }}
                                >
                                    login with google
                                </Button>
                            </LoginErrorAlert>
                        );
                    case "local":
                        return (
                            <LoginErrorAlert method={x}>
                                <LocalLogin key={x} />
                            </LoginErrorAlert>
                        );
                    default:
                        return (
                            <LoginErrorAlert method={x}>
                                <Alert
                                    key={x}
                                    startDecorator={<Warning />}
                                    color="warning"
                                    variant="outlined"
                                >
                                    unsupported authentication method: { x }
                                </Alert>
                            </LoginErrorAlert>
                        );
                    }
                }) as ReactNode[], <Divider>or</Divider>)
            }
        </Stack>
    );
}

interface LoginErrorAlertProps {
    method: string;
}

const LoginErrorAlert = ({ method, children }: PropsWithChildren<LoginErrorAlertProps>): ReactNode => {
    // @ts-expect-error
    const [searchParams, setSearchParams] = useSearchParams();

    return (
        <Stack
            gap={1}
        >
            { children }
            {
                searchParams.get("error") == method ? 
                <Alert
                    startDecorator={<Report />}
                    sx={{
                        alignItems: "flex-start"
                    }}
                    variant="soft"
                    color="danger"
                >
                    <div>
                        <div>couldn't log in</div>
                        <Typography
                            level="body-sm"
                            color="danger"
                            textTransform="lowercase"
                        >
                            { searchParams.get("errorMessage") || "something happened and i couldn't log you in" }
                        </Typography>
                        
                        <Small
                            textTransform="uppercase"
                        >
                            { searchParams.get("errorCode") || "ERR_UNKNOWN" }
                        </Small>
                    </div>
                </Alert>
                : 
                null
            }
        </Stack>
    );
}
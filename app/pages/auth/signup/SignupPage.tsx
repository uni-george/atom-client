import { useEffect, useState, type PropsWithChildren, type ReactNode } from "react";
import APIManager from "../../../managers/APIManager";
import type { LoginType } from "../../../managers/api/Auth";
import { ErrorCard } from "../../../components/ErrorCard/ErrorCard";
import { Button, CircularProgress, Stack, Typography, Link as MUILink, Divider, Alert } from "@mui/joy";
import { Google, Refresh, Report, Warning } from "@mui/icons-material";
import { Link, useSearchParams } from "react-router";
import interleave from "../../../util/interleave";
import { LocalSignUp } from "../../../components/auth/LocalSignUp";
import { Small } from "../../../components/Small/Small";

export const SignupPage = (): ReactNode => {
    const [allowedMethods, setAllowedMethods] = useState<LoginType[]>();
    const [methodLoadError, setMethodLoadError] = useState<any>(undefined);
    const [loadingMethods, setLoadingMethods] = useState<boolean>(true);

    const attemptLoad = () => {
        APIManager.auth.getSignupTypes().then(types => {
            if (types?.length) {
                setAllowedMethods(types);
            } else {
                setMethodLoadError("ERR_NO_SERVER_LOGIN_CONFIGS")
            }
            setLoadingMethods(false);
        }).catch(e => {
            setMethodLoadError(e);
            setLoadingMethods(false);
        });
    }

    const resetLoadingState = () => {
        setAllowedMethods(undefined);
        setMethodLoadError(undefined);
        setLoadingMethods(true);
    }

    useEffect(() => {
        attemptLoad();
    }, []);

    const isLoading = () => [
        loadingMethods
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
                gap={4}
            >
                <ErrorCard
                    code={methodLoadError}
                >
                    <Typography
                        level="body-md"
                    >
                        either i can't load the authentication methods, or there are none set up. please check your connection, then contact the owner of this instance of atom.
                    </Typography>
                </ErrorCard>

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
            gap={4}
        >
            <Stack
                gap={1}
            >
                <Typography
                    component="h1"
                    level="h3"
                >
                    sign up
                </Typography>
                <Typography
                    level="body-sm"
                    component="div"
                >
                    already have an account?{" "}
                    <Link
                        to="/login"
                    >
                        <MUILink
                            component="div"
                        >
                            login here!
                        </MUILink>
                    </Link>
                </Typography>
            </Stack>
            {
                interleave([...new Set(allowedMethods)]?.map(x => {
                    switch(x) {
                    case "google":
                        return (
                            <SignUpErrorAlert
                                method={x}
                            >
                                <Button
                                    key={x}
                                    variant="soft"
                                    color="neutral"
                                    fullWidth
                                    startDecorator={<Google />}
                                    onClick={() => {
                                        document.location.href = "/auth/signup/google"
                                    }}
                                >
                                    sign up with google
                                </Button>
                            </SignUpErrorAlert>
                        );
                    case "local":
                        return (
                            <SignUpErrorAlert
                                method={x}
                            >
                                <LocalSignUp />
                            </SignUpErrorAlert>
                        );
                    default:
                        return (
                            <SignUpErrorAlert
                                method={x}
                            >
                                <Alert
                                    key={x}
                                    startDecorator={<Warning />}
                                    color="warning"
                                    variant="outlined"
                                >
                                    unsupported authentication method: { x }
                                </Alert>
                            </SignUpErrorAlert>
                        )
                    }
                }) as ReactNode[], <Divider>or</Divider>)
            }
        </Stack>
    );
}

interface SignUpErrorAlertProps {
    method: string;
}

const SignUpErrorAlert = ({ method, children }: PropsWithChildren<SignUpErrorAlertProps>): ReactNode => {
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
                        <div>couldn't sign up</div>
                        <Typography
                            level="body-sm"
                            color="danger"
                            textTransform="lowercase"
                        >
                            { searchParams.get("errorMessage") || "something happened and i couldn't sign you up" }
                        </Typography>
                        
                        <Small
                            textTransform="lowercase"
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
import { Alert, CircularProgress, Stack, Typography, Link as MUILink, Button, Divider, FormControl, FormLabel, Input } from "@mui/joy";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import type { LoginType } from "../../../managers/APIManager";
import APIManager from "../../../managers/APIManager";
import { Google, Warning } from "@mui/icons-material";
import { Link } from "react-router";
import interleave from "../../../util/interleave";
import { LocalLogin } from "../../../components/auth/LocalLogin";

export const LoginPage = (): ReactNode => {
    const [allowedMethods, setAllowedMethods] = useState<LoginType[]>();
    const [methodLoadError, setMethodLoadError] = useState<any>(undefined);
    const [loadingMethods, setLoadingMethods] = useState<boolean>(true);
    const [accountRequestsOpen, setAccountRequestsOpen] = useState<boolean>(false);
    const [loadingAccountRequestsOpen, setLoadingAccountRequestsOpen] = useState<boolean>(true);

    useEffect(() => {
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
        })
    }, []);

    useEffect(() => {
        APIManager.auth.getAccountRegistrationOpen().then(open => {
            if (open) setAccountRequestsOpen(open);
        }).finally(() => {
            setLoadingAccountRequestsOpen(false);
        });
    }, [])

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
                            i can't seem to load the login settings. please contact the owner of this instance of atom.
                        </Typography>
                    </div>
                </Alert>
                <Typography
                    level="body-xs"
                    sx={{
                        opacity: "0.5",
                        mt: 1
                    }}
                >
                    ERR_NO_SERVER_LOGIN_CONFIGS
                </Typography>
            </div>
        );
    }

    return (
        <Stack
            sx={{
                gap: 4
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
                            <Button
                                key={x}
                                variant="soft"
                                color="neutral"
                                fullWidth
                                startDecorator={<Google />}
                            >
                                login with google
                            </Button>
                        );
                    case "local":
                        return (
                            <LocalLogin key={x} />
                        );
                    default:
                        return (
                            <Alert
                                key={x}
                                startDecorator={<Warning />}
                                color="warning"
                                variant="outlined"
                            >
                                unsupported authentication method: { x }
                            </Alert>
                        );
                    }
                }) as ReactNode[], <Divider>or</Divider>)
            }
        </Stack>
    );
}
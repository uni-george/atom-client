import { Alert, CircularProgress, Stack, Typography } from "@mui/joy";
import { useEffect, useState, type ReactNode } from "react";
import { AtomLogoLoading } from "../../../components/branding/AtomLogo/AtomLogo";
import type { LoginType } from "../../../managers/APIManager";
import APIManager from "../../../managers/APIManager";
import { Warning } from "@mui/icons-material";

export const LoginPage = (): ReactNode => {
    const [allowedMethods, setAllowedMethods] = useState<LoginType[]>();
    const [methodLoadError, setMethodLoadError] = useState<any>(undefined);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        APIManager.auth.getLoginTypes().then(types => {
            setAllowedMethods(types);
            setLoading(false);
        }).catch(e => {
            setMethodLoadError(e);
            setLoading(false);
        })
    }, []);

    if (loading) {
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
                gap: 4,
                mb: 2
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
                <Typography>
                    don't have an account?
                </Typography>
            </Stack>
        </Stack>
    );
}
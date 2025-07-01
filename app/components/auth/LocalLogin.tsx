import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Checkbox, FormControl, FormLabel, IconButton, Input, Stack, Link as MUILink, Box, Button, LinearProgress } from "@mui/joy";
import { useState, type FormEvent, type ReactNode } from "react";
import { Link } from "react-router";
import AuthManager from "../../managers/AuthManager";

interface FormElements extends HTMLFormControlsCollection {
    username: HTMLInputElement;
    password: HTMLInputElement;
    persistent: HTMLInputElement;
}

interface LocalSignInFormElement extends HTMLFormElement {
    readonly elements: FormElements;
}

export const LocalLogin = (): ReactNode => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [attemptingLogin, setAttemptingLogin] = useState<boolean>(false);

    // @ts-expect-error
    const [loginError, setLoginError] = useState<string | undefined>();

    const showLoading = () => [
        attemptingLogin
    ].some(x => x);

    return (
        <form
            onSubmit={(e: FormEvent<LocalSignInFormElement>) => {
                e.preventDefault();
                const formElements = e.currentTarget.elements;
                
                const data = {
                    username: formElements.username.value,
                    password: formElements.password.value,
                    persistent: formElements.persistent.value
                };

                // TODO something here
                setAttemptingLogin(true);

                AuthManager.local.login(data.username, data.password).then(x => {
                    console.log(`it was ${x}`);
                }).catch(e => {
                    console.log("it did not like that:");
                    console.log(e);
                    setLoginError(e);
                    setAttemptingLogin(false);
                })
            }}

            style={{
                position: "relative"
            }}
        >
            <Box
                sx={theme => ({
                    position: "absolute",
                    top: `-${theme.radius.xl}`,
                    left: `-${theme.radius.xl}`,
                    width: `calc(100% + (2 * ${theme.radius.xl}))`,
                    height: `calc(100% + (2 * ${theme.radius.xl}))`,
                    background: theme.palette.background.surface,
                    zIndex: 1,
                    opacity: showLoading() ? 0.8 : 0,
                    borderRadius: theme.radius.lg,
                    pointerEvents: "none",
                    transition: "opacity 0.2s"
                })}
            >
                <Box
                    sx={{
                        width: "80%",
                        mx: "auto",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <Box sx={{ width: "100%" }}>
                        <LinearProgress />
                    </Box>
                </Box>
            </Box>

            <FormControl required disabled={showLoading()}>
                <FormLabel>username</FormLabel>
                <Input type="text" name="username" autoComplete="username" />
            </FormControl>
            <FormControl required sx={{ mt: -1 }} disabled={showLoading()}>
                <FormLabel>password</FormLabel>
                <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    autoComplete="current-password"
                    endDecorator={(
                        <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {
                                showPassword ?
                                <Visibility />
                                :
                                <VisibilityOff />
                            }
                        </IconButton>
                    )}
                />
            </FormControl>
            <Stack
                sx={{
                    gap: 3,
                    mt: 2
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}
                >
                    <Checkbox size="sm" label="remember me" name="persistent" disabled={showLoading()} />
                    <Link to="/passwordreset">
                        <MUILink
                            level="title-sm"
                            component="div"
                        >
                            forgot password?
                        </MUILink>
                    </Link>
                </Box>
                <Button
                    type="submit"
                    fullWidth
                    disabled={showLoading()}
                >
                    sign in
                </Button>
            </Stack>
        </form>
    )
}
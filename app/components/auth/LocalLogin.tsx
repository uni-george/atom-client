import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FormControl, FormLabel, IconButton, Input, Stack, Link as MUILink, Box, Button } from "@mui/joy";
import { useState, type FormEvent, type ReactNode } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import AuthManager from "../../managers/AuthManager";
import { AxiosError } from "axios";
import { FormLoadingBox } from "../form/FormLoadingBox";

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
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const showLoading = () => [
        attemptingLogin
    ].some(x => x);

    return (
        <form
            onSubmit={(e: FormEvent<LocalSignInFormElement>) => {
                e.preventDefault();
                const formElements = e.currentTarget.elements;
                
                let data = {
                    username: formElements.username.value,
                    password: formElements.password.value
                };
                
                setAttemptingLogin(true);
                
                // remove login error params
                [
                    "error",
                    "errorMessage",
                    "errorCode"
                ].forEach(x => {
                    if (searchParams.has(x)) searchParams.delete(x);
                });
                setSearchParams(searchParams);


                AuthManager.local.login(data.username, data.password).then(success => {
                    if (!success) {
                        searchParams.set("error", "local");
                        setSearchParams(searchParams);
                        setAttemptingLogin(false);
                    } else {
                        navigate("/dashboard");
                    }
                }).catch(e => {
                    if (e instanceof AxiosError && e.status === 400) {
                        searchParams.set("error", "local");
                        searchParams.set("errorMessage", "invalid username and/or password :(");
                        searchParams.set("errorCode", "ERR_LOCAL_INVALID_CREDENTIALS");
                        setSearchParams(searchParams);
                    } else {
                        searchParams.set("error", "local");
                        setSearchParams(searchParams);
                    }

                    setAttemptingLogin(false);
                })
            }}

            style={{
                position: "relative"
            }}
        >
            <FormLoadingBox show={showLoading()} />

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
                    mt: 1
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "end",
                        alignItems: "center"
                    }}
                >
                    {/* <Checkbox size="sm" label="remember me" name="persistent" disabled={showLoading()} /> */}
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
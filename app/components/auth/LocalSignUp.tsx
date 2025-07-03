import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, FormControl, FormHelperText, FormLabel, IconButton, Input } from "@mui/joy";
import { useState, type FormEvent, type ReactNode } from "react";
import { useNavigate, useSearchParams } from "react-router";
import AuthManager from "../../managers/AuthManager";
import { AxiosError } from "axios";
import { FormLoadingBox } from "../form/FormLoadingBox";
import validator from "validator";

interface FormElements extends HTMLFormControlsCollection {
    username: HTMLInputElement;
    password: HTMLInputElement;
}

interface LocalSignUpFormElement extends HTMLFormElement {
    readonly elements: FormElements;
}

export const LocalSignUp = (): ReactNode => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [attemptingSignup, setAttemptingSignup] = useState<boolean>(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const showLoading = () => [
        attemptingSignup
    ].some(x => x);

    return (
        <form
            onSubmit={(e: FormEvent<LocalSignUpFormElement>) => {
                e.preventDefault();
                const formElements = e.currentTarget.elements;

                const data = {
                    username: formElements.username.value,
                    password: formElements.password.value
                }

                setAttemptingSignup(true);

                // remove error params
                [
                    "error",
                    "errorMessage",
                    "errorCode"
                ].forEach(x => {
                    if (searchParams.has(x)) searchParams.delete(x);
                });
                setSearchParams(searchParams);


                // check inputs valid
                data.username = validator.trim(data.username);
                if (!validator.matches(data.username, AuthManager.local.usernamePattern)) {
                    searchParams.set("error", "local");
                    searchParams.set("errorMessage", "invalid username - please only between 3 and 16 alphanumeric and the following characters: ._-");
                    searchParams.set("errorCode", "ERR_INVALID_USERNAME");
                    setSearchParams(searchParams);
                    setAttemptingSignup(false);
                    return;
                }

                if (!validator.matches(data.password, AuthManager.local.passwordPattern)) {
                    searchParams.set("error", "local");
                    searchParams.set("errorMessage", "invalid password - please only use between 12 and 255 alphanumeric and the following characters: ._+-/\\*=!\"£$ %^&*()[]{}:;@#~&<>?");
                    searchParams.set("errorCode", "ERR_INVALID_PASSWORD");
                    setSearchParams(searchParams);
                    setAttemptingSignup(false);
                    return;
                }


                AuthManager.local.signup(data.username, data.password).then(response => {
                    if (response) {
                        navigate("/dashboard");
                    }
                }).catch(e => {
                    if (e instanceof AxiosError && e.status == 400) {
                        searchParams.set("error", "local");
                        searchParams.set("errorMessage", "invalid username and/or password. ");
                        searchParams.set("errorCode", "ERR_LOCAL_INVALID_SIGNUP_CREDENTIALS");
                        setSearchParams(searchParams);
                    } else {
                        searchParams.set("error", "local");
                        console.log("this one")
                        console.log(e);
                        setSearchParams(searchParams);
                    }
                }).finally(() => {
                    setAttemptingSignup(false);
                })
            }}

            style={{
                position: "relative"
            }}
        >
            <FormLoadingBox show={showLoading()} />

            <FormControl required
                sx={{
                    ":focus-within": {
                        "& .MuiFormHelperText-root": {
                            maxHeight: "100px",
                            mt: 1
                        }
                    }
                }}
            >
                <FormLabel>username</FormLabel>
                <Input type="text" name="username" autoComplete="username" />
                <FormHelperText
                    sx={{
                        maxHeight: 0,
                        transition: "all 0.1s",
                        overflow: "hidden",
                        mt: 0
                    }}
                >
                    must match: { AuthManager.local.usernamePattern.toString() }
                </FormHelperText>
            </FormControl>
            <FormControl required 
                sx={{
                    mt: -1,
                    ":focus-within": {
                        "& .MuiFormHelperText-root": {
                            maxHeight: "100px",
                            mt: 1
                        }
                    }
                }}
            >
                <FormLabel>password</FormLabel>
                <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    autoComplete="new-password"
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
                <FormHelperText
                    sx={{
                        maxHeight: 0,
                        transition: "all 0.1s",
                        overflow: "hidden",
                        mt: 0
                    }}
                >
                    must match: <br /> { AuthManager.local.passwordPattern.toString() }
                </FormHelperText>
            </FormControl>
            <Button
                type="submit"
                fullWidth
                sx={{
                    mt: 2
                }}
            >
                sign up
            </Button>
        </form>
    );
}
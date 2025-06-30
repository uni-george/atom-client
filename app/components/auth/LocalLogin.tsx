import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Checkbox, FormControl, FormLabel, IconButton, Input, Stack, Link as MUILink, Box, Button } from "@mui/joy";
import { useState, type FormEvent, type ReactNode } from "react";
import { Link } from "react-router";

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

    return (
        <Stack
            sx={{
                gap: 4,
            }}
        >
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
                }}
            >
                <FormControl required>
                    <FormLabel>username</FormLabel>
                    <Input type="text" name="username" />
                </FormControl>
                <FormControl required>
                    <FormLabel>password</FormLabel>
                    <Input
                        type={showPassword ? "text" : "password"}
                        name="password"
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
                        gap: 4,
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
                        <Checkbox size="sm" label="remember me" name="persistent" />
                        <Link to="passwordreset">
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
                    >
                        sign in
                    </Button>
                </Stack>
            </form>
        </Stack>
    )
}
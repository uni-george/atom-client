import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, FormControl, FormLabel, IconButton, Input } from "@mui/joy";
import { useState, type FormEvent, type ReactNode } from "react";

interface FormElements extends HTMLFormControlsCollection {
    username: HTMLInputElement;
    password: HTMLInputElement;
}

interface LocalSignUpFormElement extends HTMLFormElement {
    readonly elements: FormElements;
}

export const LocalSignUp = (): ReactNode => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    return (
        <form
            onSubmit={(e: FormEvent<LocalSignUpFormElement>) => {
                e.preventDefault();
                const formElements = e.currentTarget.elements;

                //@ts-expect-error
                const data = {
                    username: formElements.username.value,
                    password: formElements.password.value
                }

                // TODO: something here
            }}
        >
            <FormControl required>
                <FormLabel>username</FormLabel>
                <Input type="text" name="username" autoComplete="username" />
            </FormControl>
            <FormControl required sx={{ mt: -1 }}>
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
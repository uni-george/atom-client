import { type ReactNode } from "react";
import { Container, Stack, Typography } from "@mui/joy";
import { AtomLogoSheet } from "./components/branding/AtomLogo/AtomLogo";

import { ModeSwitcher } from "./components/ModeSwitcher/ModeSwitcher";

export const App = (): ReactNode => {

    return (
        <Stack
            direction="column"
            justifyContent="space-between"
            sx={{
                minHeight: "100vh"
            }}
        >
            <Container>
                <Typography
                    level="h1"
                >
                    hi
                </Typography>

                <ModeSwitcher />
            </Container>
            <AtomLogoSheet />
        </Stack>
    )
};

export default App;
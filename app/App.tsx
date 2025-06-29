import { type ReactNode } from 'react'
import { RootNode } from './components/RootNode/RootNode'
import { Container, Stack, Typography } from '@mui/joy';
import { AtomLogoSheet } from './components/branding/AtomLogo/AtomLogo';

import "./assets/css/global.css";
import { ModeSwitcher } from './components/ModeSwitcher/ModeSwitcher';

export const App = (): ReactNode => {

    return (
        <RootNode>
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
        </RootNode>
    )
};

export default App;
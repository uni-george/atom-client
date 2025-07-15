import { CssBaseline, CssVarsProvider, extendTheme } from "@mui/joy";
import type { PropsWithChildren, ReactNode } from "react";

const theme = extendTheme({
    cssVarPrefix: "atom",
    fontFamily: {
        body: "Funnel Sans Variable",
        display: "Outfit Variable",
        code: "IBM Plex Mono"
    }
});

export const RootNode = ({ children }: PropsWithChildren): ReactNode => {
    return (
        <CssVarsProvider
            theme={theme}
            modeStorageKey="mode-toggle"
            disableNestedContext
            defaultMode="dark"
        >
            <CssBaseline />
            { children }
        </CssVarsProvider>
    );
}
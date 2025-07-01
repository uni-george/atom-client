import { CssBaseline, CssVarsProvider, extendTheme } from "@mui/joy";
import type { PropsWithChildren, ReactNode } from "react";

// @ts-expect-error
import "@fontsource-variable/outfit";
//@ts-expect-error
import "@fontsource/ibm-plex-mono"

const theme = extendTheme({
    cssVarPrefix: "atom",
});

export const RootNode = ({ children }: PropsWithChildren): ReactNode => {
    return (
        <CssVarsProvider
            theme={theme}
            modeStorageKey="mode-toggle"
            disableNestedContext
            defaultMode="dark"
        >
            <CssBaseline  />

            { children }
        </CssVarsProvider>
    );
}
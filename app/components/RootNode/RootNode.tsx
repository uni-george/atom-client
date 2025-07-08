import { CssBaseline, CssVarsProvider, extendTheme } from "@mui/joy";
import type { PropsWithChildren, ReactNode } from "react";

// @ts-expect-error
import "@fontsource-variable/outfit";
// @ts-expect-error
import "@fontsource/ibm-plex-mono";
// @ts-expect-error
import "@fontsource-variable/funnel-sans";

const theme = extendTheme({
    cssVarPrefix: "atom",
    fontFamily: {
        body: "Funnel Sans",
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
            <CssBaseline  />

            { children }
        </CssVarsProvider>
    );
}
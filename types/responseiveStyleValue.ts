import type { Breakpoint } from "@mui/system";

export type ResponsiveStyleValue<T> = T | Array<T | null> | {
    [key in Breakpoint]?: T | null;
};
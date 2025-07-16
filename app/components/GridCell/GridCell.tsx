import { Grid } from "@mui/joy";
import type { ResponsiveStyleValue } from "../../../types/responseiveStyleValue";
import type { PropsWithChildren, ReactNode } from "react";

interface GridCellProps {
    size?: number | ResponsiveStyleValue<number>;
}

export const GridCell = ({ size = 12, children }: PropsWithChildren<GridCellProps>): ReactNode => {
    const fallback = 12;

    return (
        <Grid
            sx={[
                theme => (
                    typeof size == "number" || size == null ?
                        {
                            "--Column-width": size
                        }
                        :
                        !Array.isArray(size) ?
                            {
                                "--Column-width": size.xs || fallback,
                                [theme.breakpoints.up("sm")]: {
                                    "--Column-width": size.sm || size.xs || fallback
                                },
                                [theme.breakpoints.up("md")]: {
                                    "--Column-width": size.md || size.sm || size.xs || fallback
                                },
                                [theme.breakpoints.up("lg")]: {
                                    "--Column-width": size.lg || size.md || size.sm || size.xs || fallback
                                },
                                [theme.breakpoints.up("xl")]: {
                                    "--Column-width": size.xl || size.lg || size.md || size.sm || size.xs || fallback
                                }
                            }
                            :
                            null
                ),
                {
                    width: "calc((100% - (((var(--Grid-columns) / var(--Column-width)) - 1) * var(--Grid-parent-columnSpacing))) * (var(--Column-width) / var(--Grid-columns)))"
                }
            ]}
        >
            { children }
        </Grid>
    );
}
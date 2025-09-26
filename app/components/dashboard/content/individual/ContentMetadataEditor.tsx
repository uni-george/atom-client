import { Box, Card, Divider, Grid, Typography } from "@mui/joy";
import type { ReactNode } from "react";

export const ContentMetadataEditor = (): ReactNode => {
    return (
        <Card
            sx={{
                width: 1
            }}
        >
            <Box>
                <Typography
                    level="title-md"
                >
                    content metadata
                </Typography>
                <Typography
                    level="body-sm"
                >
                    change how this content is shown in atom
                </Typography>
            </Box>
            <Divider />
            <Grid
                columns={12}
                container
                spacing={1}
            >

            </Grid>
        </Card>
    );
}
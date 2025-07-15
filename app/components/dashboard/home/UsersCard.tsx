import { GroupRounded } from "@mui/icons-material";
import { Card, CardContent, Stack, Typography } from "@mui/joy";
import { useEffect, useState, type ReactNode } from "react";
import APIManager from "../../../managers/APIManager";
import millify from "millify";

export const UsersCard = (): ReactNode => {
    const [numUsers, setNumUsers] = useState<number|undefined>(undefined);

    useEffect(() => {
        APIManager.user.count().then(x => {
            setNumUsers(x);
        }).catch();
    }, []);

    return (
        <Card
            variant="solid"
            color="primary"
            sx={{
                px: 4
            }}
            invertedColors
        >
            <CardContent
                orientation="horizontal"
            >
                <GroupRounded
                    sx={{
                        fontSize: {
                            xs: 64,
                            md: 96
                        }
                    }}
                />
                <Stack
                    justifyContent="center"
                >
                    <Typography
                        level="body-md"
                    >
                        users
                    </Typography>
                    <Typography
                        level="h2"
                    >
                        { numUsers ? millify(numUsers, {
                            precision: 2
                        }) : "…" }
                    </Typography>
                </Stack>
            </CardContent>
        </Card>
    );
}
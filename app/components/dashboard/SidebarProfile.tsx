import { Avatar, Box, IconButton, Skeleton, Tooltip, Typography } from "@mui/joy";
import { useContext, useEffect, useState, type ReactNode } from "react";
import { AuthGuardUserContext } from "../../context/AuthGuardUserContext";
import APIManager from "../../managers/APIManager";
import { LogoutRounded } from "@mui/icons-material";
import AuthManager from "../../managers/AuthManager";
import { useNavigate } from "react-router";

export const SidebarProfile = (): ReactNode => {
    const user = useContext(AuthGuardUserContext);
    const [image, setImage] = useState<string|undefined>(undefined);
    const [tryingToLogOut, setTryingToLogOut] = useState<boolean>(false);
    const [logoutErrorTooltip, setLogoutErrorTooltip] = useState<string|undefined>(undefined);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            APIManager.image.getURL(user.avatarID || "").then(x => {
                setImage(x);
            })
        }
    }, [user]);

    return (
        <Box
            sx={{
                display: "flex",
                gap: 1,
                alignItems: "center"
            }}
        >
            <Avatar
                variant="outlined"
                src={image}
                onClick={() => navigate(`/dashboard/users/${encodeURIComponent(user?.id || "")}`)}
                sx={{
                    cursor: "pointer"
                }}
            >
                {user?.name?.[0]?.toString?.().toUpperCase()}
            </Avatar>
            <Box
                sx={{
                    minWidth: 0,
                    flex: 1,
                    cursor: "pointer"
                }}
                onClick={() => navigate(`/dashboard/users/${encodeURIComponent(user?.id || "")}`)}
            >
                <Typography
                    level="title-sm"
                    noWrap
                >
                    {user?.name || <Skeleton>usernameeeee</Skeleton>}
                </Typography>
            </Box>
            <Tooltip
                title={logoutErrorTooltip}
                size="sm"
                variant="outlined"
                arrow
            >
                <IconButton
                    size="sm"
                    variant="plain"
                    color={logoutErrorTooltip ? "danger" : "neutral"}
                    onClick={() => {
                        AuthManager.logout().then(x => {
                            if (x) navigate("/");
                            else {
                                setLogoutErrorTooltip("couldn't log out")
                            }
                        }).finally(() => {
                            setTryingToLogOut(false);
                        });
                        setTryingToLogOut(true);
                    }}
                    disabled={tryingToLogOut}
                    sx={theme => ({
                        ["& > svg"]: {
                            fill: theme.palette.danger.plainColor
                        }
                    })}
                >
                    <LogoutRounded />
                </IconButton>
            </Tooltip>
        </Box>
    );
}
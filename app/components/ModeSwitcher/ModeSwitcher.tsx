import { IconButton, Tooltip, useColorScheme, type IconButtonProps } from "@mui/joy";
import { useEffect, useState, type ReactNode } from "react";
import { DarkModeRounded as DarkModeRoundedIcon, LightModeOutlined as LightModeOutlinedIcon } from "@mui/icons-material";

export const ModeSwitcher = (props: IconButtonProps): ReactNode => {
    const { onClick, ...other } = props;
    const { mode, setMode } = useColorScheme();
    const [mounted, setMounted] = useState<boolean>(false)

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <Tooltip
            title={ `switch to ${mode == "light" ? "dark" : "light"} mode` }
            variant="outlined"
            size="sm"
            enterDelay={200}
            arrow
        >
            <IconButton
                aria-label="toggle light/dark mode"
                size="sm"
                variant="outlined"
                disabled={!mounted}
                sx={{
                    height: "fit-content"
                }}
                onClick={e => {
                    setMode(mode == "light" ? "dark" : "light");
                    onClick?.(e);
                }}
                {...other}
            >
                { mode == "light" ? <DarkModeRoundedIcon /> : <LightModeOutlinedIcon /> }
            </IconButton>    
        </Tooltip>
    );
}
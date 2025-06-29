import { Box, Sheet, Stack, Typography, type StackProps } from "@mui/joy";
import type { ReactNode } from "react";
import { Pulse } from "../../animation/Pulse/Pulse";

import logo from "../../../assets/img/atom32.png";

interface AtomLogoProps extends StackProps {
    noText?: boolean;
}

const spacing: number = 2;

export const AtomLogo = (props: AtomLogoProps): ReactNode => {
    const { noText, ...other } = props;

    return (
        <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            {...other}
        >
            <Box
                sx={theme => ({
                    p: theme.spacing(spacing),
                    height: 64
                })}
            >
                <img 
                    src={logo}
                    style={{
                        width: "32px"
                    }}
                />
            </Box>
            {
                !noText ? 
                <Typography
                    level="h2"
                    sx={theme => ({
                        fontFamily: `"Outfit Variable", sans-serif`,
                        pr: theme.spacing(spacing),
                    })}
                >
                    atom
                </Typography>
                : null
            }
        </Stack>
    );
}

export const AtomLogoSheet = (): ReactNode => {
    return (
        <Sheet
            variant="outlined"
            sx={theme => ({
                width: "fit-content",
                height: "fit-content",
                borderRadius: theme.radius.md
            })}
        >
            <AtomLogo />
        </Sheet>
    );
}

interface AtomLogoDomProps {
    width?: number;
}

export const AtomLogoDOM = ({ width = 256 }: AtomLogoDomProps): ReactNode => {
    const holeRadius = 0.25;

    return (
        <div
            style={{
                width: width,
                aspectRatio: "1"
            }}
        >
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                {/* main background bit */}
                <div
                    style={{
                        width: "100%",
                        height: "100%",
                        top: "0",
                        left: "0",
                        borderRadius: "50%",
                        background: "linear-gradient(43deg, #cc50b9 0%, #f9bf45 100%)",
                        position: "absolute",
                        clipPath: "circle(100% at 50% 50%)",
                        mask: `radial-gradient(${width * holeRadius}px, #0000 calc(100% - 1px), #000)`,
                    }}
                >
                </div>
                {/* hanging bit */}
                <div 
                    style={{
                        // width: `calc((100% - ${width * 2 * holeRadius}px) / 2)`,
                        // height: "50%",
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        bottom: "0",
                        right: "0",
                        background: "linear-gradient(43deg, #cc50b9 0%, #f9bf45 100%)",
                        clipPath: `polygon(${100 * (1 - (0.5 - holeRadius))}% 50%, 120% 50%, 120% 100%, ${100 * (1 - (0.5 - holeRadius))}% 100%)`
                    }}
                />
            </div>
        </div>
    );
}

export const AtomLogoLoading = ({ width = 256 }: AtomLogoDomProps): ReactNode => {
    return (
        <div
            style={{
                "--Pulse-visible": "rgba(240, 175, 108, 0.7)",
                "--Pulse-invisible": "rgba(240, 175, 108, 0)",
                "--Pulse-full-visible": "rgba(240, 175, 108, 1)",
                "--Pulse-distance": `${0.06 * width}px`,
                width: `${width}px`
            } as React.CSSProperties}
        >
            <Pulse
                style={{
                    maxWidth: "256px",
                    width: `${width}px`,
                    borderRadius: "50%"
                }}
            >
                <AtomLogoDOM width={width} />
            </Pulse>
        </div>
    );
}
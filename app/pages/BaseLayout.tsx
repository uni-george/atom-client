import { useEffect, useState, type PropsWithChildren, type ReactNode } from "react";
import { Outlet } from "react-router";
import APIManager from "../managers/APIManager";
import { RootLoading } from "./RootLoading";
import AuthPageStyle from "./auth/AuthPageStyle";
import { ErrorCard } from "../components/ErrorCard/ErrorCard";
import { Typography } from "@mui/joy";

export default function BaseLayout({ children }: PropsWithChildren): ReactNode {
    const [isTestingAPI, setIsTestingAPI] = useState<boolean>(true);
    const [apiDown, setAPIDown] = useState<boolean>(false);

    useEffect(() => {
        APIManager.test().then(x => {
            if (x) {
                setIsTestingAPI(false);
            } else {
                setAPIDown(true);
                setIsTestingAPI(false);
            }
        })
    }, []);

    if (apiDown) {
        return (
            <AuthPageStyle>
                <ErrorCard
                    title="no server connection"
                    code="ERR_NO_API"
                >
                    <Typography
                        level="body-md"
                    >
                        i can't access the server. this normally means that you're currently offline, or that the owner of this instance of atom hasn't set it up quite correctly. please check your internet connection, then contact the owner if issues persist.
                    </Typography>
                </ErrorCard>
            </AuthPageStyle>
        );
    }

    if (isTestingAPI) return (
        <RootLoading />
    );

    return (
        <>
            <Outlet />
            { children }
        </>
    );
}
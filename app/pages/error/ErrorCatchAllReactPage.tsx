import type { ReactNode } from "react";
import AuthPageStyle from "../auth/AuthPageStyle";
import { Typography } from "@mui/joy";
import { ErrorCard, ErrorCardCode } from "../../components/ErrorCard/ErrorCard";

interface ErrorCatchAllReactPageProps {
    message?: string;
    errorCode?: string;
}

export const ErrorCatchAllReactPage = ({ message, errorCode }: ErrorCatchAllReactPageProps): ReactNode => {
    return (
        <>
            <title>error - atom</title>
            <AuthPageStyle>
                <ErrorCard
                    code={errorCode}
                >
                    <Typography
                        level="body-md"
                    >
                        it would seem there's a slight issue:
                    </Typography>
                    <ErrorCardCode>
                        { message }
                    </ErrorCardCode>
                </ErrorCard>          
            </AuthPageStyle>
        </>
    );
}
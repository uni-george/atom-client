import type { ReactNode } from "react";
import AuthPageStyle from "../auth/AuthPageStyle";
import { Small } from "../../components/Small/Small";
import { NotFoundPage } from "./NotFoundPage";
import { ErrorCard } from "../../components/ErrorCard/ErrorCard";
import { Typography } from "@mui/joy";

interface ErrorCatchAllHTTPPageProps {
    httpCode?: number;
    message?: string;
    errorCode?: string;
}

export const ErrorCatchAllHTTPPage = ({ httpCode, message }: ErrorCatchAllHTTPPageProps): ReactNode => {
    return (
        <>
            <title>error - atom</title>
            <AuthPageStyle>
                {
                    httpCode === 404 ?
                    <NotFoundPage />
                    :
                    <ErrorCard
                        code={`ERR_HTTP_${httpCode}`}
                    >
                        <Typography
                            level="body-md"
                        >
                            { message }
                        </Typography>
                    </ErrorCard>
                }
            </AuthPageStyle>
        </>
    );
}
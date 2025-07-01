import type { ReactNode } from "react";
import AuthPageStyle from "../auth/AuthPageStyle";
import { Small } from "../../components/Small/Small";
import { NotFoundPage } from "./NotFoundPage";

interface ErrorCatchAllHTTPPageProps {
    httpCode?: number;
    message?: string;
    errorCode?: string;
}

export const ErrorCatchAllHTTPPage = ({ httpCode, message, errorCode }: ErrorCatchAllHTTPPageProps): ReactNode => {
    console.log(httpCode);

    return (
        <>
            <title>error - atom</title>
            <AuthPageStyle>
                {
                    httpCode === 404 ?
                    <NotFoundPage />
                    :
                    <>
                        <h1>error - {httpCode}</h1>
                        <p>{ message }</p>
                        <Small>{ errorCode }</Small>
                    </>
                }
            </AuthPageStyle>
        </>
    );
}
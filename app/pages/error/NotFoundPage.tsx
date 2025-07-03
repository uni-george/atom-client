import { type ReactNode } from "react";
import { UnauthenticatedNotFoundPage } from "./unauthenticated/UnauthenticatedNotFoundPage";

export const NotFoundPage = (): ReactNode => {
    return (
        <>
            <title>atom - 404</title>
            <UnauthenticatedNotFoundPage />
        </>
    );
}
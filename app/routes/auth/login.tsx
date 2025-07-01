import type { ReactNode } from "react";
import type { Route } from "./+types/login";
import { LoginPage } from "../../pages/auth/login/LoginPage";

// @ts-expect-error
export default function Login({ loaderData }: Route.ComponentProps): ReactNode {
    return (
        <LoginPage />
    );
}
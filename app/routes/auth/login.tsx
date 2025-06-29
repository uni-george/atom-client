import type { ReactNode } from "react";
import type { Route } from "./+types/login";
import { LoginPage } from "../../pages/auth/login/LoginPage";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
    await new Promise(resolve => setTimeout(resolve, 3000));
    return true;
}

export default function Login({ loaderData }: Route.ComponentProps): ReactNode {
    return (
        <LoginPage />
    );
}
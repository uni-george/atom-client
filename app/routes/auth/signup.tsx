import type { ReactNode } from "react";
import type { Route } from "./+types/signup";
import { SignupPage } from "../../pages/auth/signup/SignupPage";

// @ts-expect-error
export default function Signup({ loaderData }: Route.ComponentProps): ReactNode {
    return (
        <SignupPage />
    )
}
import { createContext, useEffect, useState, type ReactNode } from "react";
import type { User } from "../../../types/user";
import { Outlet, redirect } from "react-router";
import APIManager from "../../managers/APIManager";
import { RootLoading } from "../RootLoading";

export const AuthGuardUserContext = createContext<User|undefined>(undefined);

export default function AuthGuardLayout(): ReactNode {
    const [user, setUser] = useState<User|undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        APIManager.user.me().then(x => {
            setUser(x);
            setLoading(false);
        })
    }, []);

    if (loading) {
        return (
            /**
             * for god knows what reason the sx in RootLoading doesn't work here unless
             * there's something being fed to it through props? react is weird
             */
            <RootLoading 
                sx={{
                    background: "unset"
                }}
            />
        )
    }

    if (!user) {
        redirect("/login");
    }

    return (
        <AuthGuardUserContext
            value={user}
        >
            user: { user?.name }
            <Outlet />
        </AuthGuardUserContext>
    );
}
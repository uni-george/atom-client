import { useEffect, useState, type ReactNode } from "react";
import type { User } from "../../../types/user";
import { Outlet, useNavigate } from "react-router";
import APIManager from "../../managers/APIManager";
import { RootLoading } from "../RootLoading";
import { AuthGuardUserContext } from "../../context/AuthGuardUserContext";

export default function AuthGuardLayout(): ReactNode {
    const [user, setUser] = useState<User|undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        APIManager.user.me().then(x => {
            setUser(x);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return (
            <RootLoading
                sx={{
                    background: "unset"
                }}
            />
        )
    }

    if (!user) {
        navigate("/login");
    }

    return (
        <AuthGuardUserContext
            value={user}
        >
            <Outlet />
        </AuthGuardUserContext>
    );
}
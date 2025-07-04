import { createContext } from "react";
import type { User } from "../../types/user";

export const AuthGuardUserContext = createContext<User|undefined>(undefined);
import { createContext, type Dispatch, type SetStateAction } from "react";
import type { User } from "../../types/user";

export const AuthGuardUserContext = createContext<User|undefined>(undefined);
export const SetAuthGuardUserContext = createContext<Dispatch<SetStateAction<User|undefined>>|undefined>(undefined);
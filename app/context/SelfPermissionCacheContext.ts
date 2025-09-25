import { createContext, type Dispatch, type SetStateAction } from "react";
import type { GlobalPermissionsObject } from "../managers/api/Permission";

export const SelfPermissionCacheContext = createContext<GlobalPermissionsObject|undefined>(undefined);
export const SetSelfPermissionCacheContext = createContext<Dispatch<SetStateAction<GlobalPermissionsObject|undefined>>|undefined>(undefined);
import { AxiosError } from "axios";
import type { User as UserObject } from "../../../types/user";
import APIManager from "../APIManager";

export type UserSearchProperties = "id" | "name";
export type UserSearchSortDirection = "ascending" | "descending";

type UserSearchParams = {
    limit?: number;
    offset?: number;
    group?: string;
    sortBy?: UserSearchProperties;
    sortDirection?: UserSearchSortDirection;
    name?: string;
}

export class User {
    /**
     * Get the current user.
     * @returns The user object if logged in, undefined if not.
     */
    static async me(): Promise<UserObject|undefined> {
        try {
            let res = await APIManager.request({
                method: "get",
                url: "/user/me"
            });

            if (res) return res.data as UserObject;
            else return undefined;
        } catch {
            return undefined;
        }
    }

    /**
     * Get a user by their ID.
     * @param id The user's ID.
     * @returns The user object.
     */
    static async get(id: string): Promise<UserObject|undefined> {
        try {
            let res = await APIManager.request({
                method: "get",
                url: `/user/${encodeURIComponent(id)}`
            });

            if (res) return res.data as UserObject;
            else return undefined;
        } catch {
            return undefined;
        }
    }

    /**
     * Update a user's details.
     * @param user The updated user details.
     * @returns The updated user object.
     */
    static async update(user: UserObject): Promise<UserObject|undefined> {
        try {
            let res = await APIManager.request({
                method: "patch",
                url: `/user/${user.id}`,
                data: {
                    name: user.name,
                    avatarID: user.avatarID
                }
            });

            if (!res) return undefined;
            return res.data as UserObject;
        } catch (e) {
            if (e instanceof AxiosError) {
                if (e.status && e.status >= 400 && e.status < 500) {
                    throw e.response?.data;
                }
            }
            return undefined;
        }
    }

    /**
     * Delete a user.
     * @param id The user's ID.
     * @returns True if successful.
     */
    static async delete(id: string): Promise<boolean> {
        try {
            let res = await APIManager.request({
                method: "delete",
                url: `/user/${id}`,
            });

            if (!res) return false;
            return true;
        } catch (e) {
            if (e instanceof AxiosError) {
                if (e.status && e.status >= 400 && e.status < 500) {
                    throw e.response?.data;
                }
            }
            return false;
        }
    }

    /**
     * Search users.
     * @param params The search parameters.
     * @returns The users if found.
     */
    static async search(params: UserSearchParams = {}): Promise<UserObject[]|undefined> {
        try {
            let res = await APIManager.request({
                method: "get",
                url: "/user/search",
                params: {
                    limit: params.limit !== undefined ? Math.max(0, Math.min(50, params.limit)) : 50,
                    offset: params.offset !== undefined ? Math.max(0, params.offset) : 0,
                    group: params.group,
                    sortBy: params.sortBy,
                    sortDirection: params.sortDirection,
                    name: params.name
                }
            });

            if (res) return res.data as UserObject[];
            else return undefined;
        } catch {
            return undefined;
        }
    }

    /**
     * Get the total number of users that match search parameters.
     * @param params The search parameters.
     * @returns The number of users that match the search parameters.
     */
    static async count(params: UserSearchParams = {}): Promise<number | undefined> {
        try {
            let res = await APIManager.request({
                method: "get",
                url: "/user/count",
                params: {
                    group: params.group,
                    name: params.name
                }
            });

            if (res) return res.data.count as number;
            else return undefined;
        } catch {
            return undefined;
        }
    }
}
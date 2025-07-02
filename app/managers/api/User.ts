import type { User as UserObject } from "../../../types/user";
import APIManager from "../APIManager";

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
}
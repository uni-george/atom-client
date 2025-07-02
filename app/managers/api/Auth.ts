import APIManager from "../APIManager";

export type LoginType = "local" | "google";

export class Auth {
    /**
     * Check if the user is logged in.
     * @returns True/false depending on whether the user is logged in.
     */
    static async loggedIn(): Promise<boolean> {
        try {
            await APIManager.request({
                method: "get",
                url: "/user/me"
            });

            return true;
        } catch (e) {            
            return false;
        }
    }

    static async getLoginTypes(): Promise<LoginType[] | undefined> {
        let req = await APIManager.request({
            method: "get",
            url: "/auth/methods/login"
        });

        if (req?.data) return req.data;
        else return undefined;
    }

    static async getSignupTypes(): Promise<LoginType[] | undefined> {
        let req = await APIManager.request({
            method: "get",
            url: "/auth/methods/signup"
        });

        if (req?.data) return req.data;
        else return undefined;
    }

    static async getAccountRegistrationOpen(): Promise<boolean | undefined> {
        let req = await APIManager.request({
            method: "get",
            url: "/auth/methods/signup"
        });

        if (req?.data) return req.data?.length;
        else return undefined;
    }
}
import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from "axios";
import config from "../../config/config.json";

export type LoginType = "local" | "google";

class Auth {
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
        } catch {
            return false;
        }
    }

    static async getLoginTypes(): Promise<LoginType[] | undefined> {
        let req = await APIManager.request({
            method: "get",
            url: "/auth/methods"
        });

        if (req?.data) return req.data;
        else return undefined;
    }
}

class APIManager {
    /**
     * The APIManager's instance of axios.
     */
    static #axios?: AxiosInstance = undefined;

    /**
     * Whether the APIManager has been initialised.
     */
    static #initialised: boolean = false;

    // children
    static auth = Auth;

    /**
     * Initialise the APIManager.
     */
    static init() {
        APIManager.#axios = axios.create({
            baseURL: `https://${config.hostname}/api/`,
            allowAbsoluteUrls: false,
            timeout: 1000,
            headers: {
                Accept: "application/json"
            }
        });

        APIManager.#initialised = true;
    }

    /**
     * Perform an API request.
     * @param data The request data.
     * @returns The response.
     */
    static async request(data: AxiosRequestConfig<any>): Promise<AxiosResponse<any, any> | undefined> {
        if (!APIManager.#initialised) APIManager.init();
        return APIManager.#axios?.request(data);
    }
}

export default APIManager;
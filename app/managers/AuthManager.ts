import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from "axios";
import config from "../../config/config.json";

class LocalAuthManager {
    static async login(username: string, password: string): Promise<boolean> {
        let res = await AuthManager.request({
            method: "post",
            url: "/login/local",
            data: {
                username,
                password
            }
        });

        if (res) return true;
        return false;
    }
}

class AuthManager {
    /**
     * The APIManager's instance of axios.
     */
    static #axios?: AxiosInstance = undefined;

    /**
     * Whether the APIManager has been initialised.
     */
    static #initialised: boolean = false;

    static local = LocalAuthManager;

    /**
     * Initialise the APIManager.
     */
    static init() {
        AuthManager.#axios = axios.create({
            baseURL: config.auth.location,
            allowAbsoluteUrls: false,
            timeout: 1000,
            headers: {
                Accept: "application/json"
            },
        });

        AuthManager.#initialised = true;
    }

    /**
     * Perform an auth request.
     * @param data The request data.
     * @returns The response.
     */
    static async request(data: AxiosRequestConfig<any>): Promise<AxiosResponse<any, any> | undefined> {
        if (!AuthManager.#initialised) AuthManager.init();
        return await AuthManager.#axios?.request(data);
    }
}

export default AuthManager;
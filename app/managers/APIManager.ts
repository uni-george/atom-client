import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from "axios";
import config from "../../config/config.json";
import { Auth } from "./api/Auth";
import { User } from "./api/User";
import { Image } from "./api/Image";

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
    static user = User;
    static image = Image;

    /**
     * Initialise the APIManager.
     */
    static init() {
        APIManager.#axios = axios.create({
            baseURL: config.apiLocation,
            allowAbsoluteUrls: false,
            timeout: 5000,
            headers: {
                Accept: "application/json"
            },
            withCredentials: true
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
        return await APIManager.#axios?.request(data);
    }

    static async test(): Promise<Object|undefined> {
        try {
            let res = await APIManager.request({
                method: "get",
                url: "/test"
            });

            return res;
        } catch (e) {
            return false;
        }
    }
}

export default APIManager;
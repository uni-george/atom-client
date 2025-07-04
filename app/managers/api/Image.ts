import APIManager from "../APIManager";

export class Image {
    /**
     * Get an image's URL from its ID.
     * @param id The image's ID.
     * @returns The image's URL, or undefined if not found.
     */
    static async getURL(id: string): Promise<string|undefined> {
        try {
            let res = await APIManager.request({
                method: "get",
                url: `/image/${encodeURIComponent(id)}`,
                // cors so no credentials?
                withCredentials: false
            });

            return res?.request?.responseURL;
        } catch {
            return undefined;
        }
    }
}
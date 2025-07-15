import APIManager from "../APIManager";

export type ImageObject = {
    id: string;
    isExternal?: boolean;
    source?: string;
    url?: string;
}

type ImageSearchParams = {
    limit?: number;
    offset?: number;
    name?: string;
    type?: string;
    internal?: boolean;
    uploadedBy?: string;
}

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

    static async search(params: ImageSearchParams = {}): Promise<ImageObject[]|undefined> {
        try {
            let res = await APIManager.request({
                method: "get",
                url: "/image/search",
                params: {
                    limit: params.limit !== undefined ? Math.max(0, Math.min(50, params.limit)) : 50,
                    offset: params.offset !== undefined ? Math.max(0, params.offset) : 0,
                    name: params.name,
                    type: params.type,
                    internal: params.internal,
                    uploadedBy: params.uploadedBy
                }
            });

            if (res) return res.data as ImageObject[];
            else return undefined;
        } catch {
            return undefined;
        }
    }
}
import APIManager from "../APIManager";

export type ContentObject = {
    id: string;
    name?: string;
    parentID?: string;
    data?: string | number;
    type: "string" | "number";
}

type ContentPathEntryObject = {
    id: string;
    name: string;
}

export type ContentPath = ContentPathEntryObject[];

export type ContentFolderObject = {
    id: string;
    name: string;
    parentID?: string;
    path?: ContentPath;
    childFolders?: string[];
    childContent?: ContentObject[];
}

export class Content {
    static async getTopLevel(): Promise<{ folders: ContentFolderObject[], content: ContentObject[] }|undefined> {
        try {
            let res = await APIManager.request({
                method: "get",
                url: "/content",
            });

            if (!res) return undefined;
            return res.data;
        } catch {
            return undefined;
        }
    }

    static async getFolder(id: string, includePath: boolean = false, includeContent: boolean = false): Promise<ContentFolderObject|undefined> {
        try {
            let res = await APIManager.request({
                method: "get",
                url: `/content/folder/${id}`,
                params: {
                    includePath,
                    includeContent
                }
            });

            if (!res) return undefined;

            return res.data as ContentFolderObject;
        } catch {
            return undefined;
        }
    }
}
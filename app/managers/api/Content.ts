import APIManager from "../APIManager";

export type ContentObject = ContentObjectNoID & {
    id: string;
}

type ContentObjectNoID = {
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
    childFolders?: string[] | ContentFolderObject[];
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

    static async getContent(id: string): Promise<ContentObject|undefined> {
        try {
            let res = await APIManager.request({
                method: "get",
                url: `/content/${encodeURIComponent(id)}`
            });

            if (!res) return undefined;
            return res.data;
        } catch {
            return undefined;
        }
    }

    static async create({ name, type, data, parentID }: ContentObjectNoID): Promise<ContentObject|undefined> {
        try {
            let res = await APIManager.request({
                method: "post",
                url: `/content`,
                data: {
                    name,
                    type,
                    data,
                    parentID
                }
            });

            if (!res) return undefined;
            else return res.data;
        } catch {
            return undefined;
        }
    }

    static async createFolder(name: string, parentID?: string): Promise<ContentFolderObject|undefined> {
        try {
            let res = await APIManager.request({
                method: "post",
                url: `/content/folder`,
                data: {
                    name,
                    parentID
                }
            });

            if (!res) return undefined;
            else return res.data as ContentFolderObject;
        } catch {
            return undefined;
        }
    }

    static async getFolder(id: string, includePath: boolean = false, includeContent: boolean = false): Promise<ContentFolderObject|undefined> {
        try {
            let res = await APIManager.request({
                method: "get",
                url: `/content/folder/${encodeURIComponent(id)}`,
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

    static async deleteFolder(id: string): Promise<boolean> {
        try {
            let res = await APIManager.request({
                method: "delete",
                url: `/content/folder/${encodeURIComponent(id)}`
            });

            if (!res) return false;
            return true;
        } catch {
            return false;
        }
    }
}
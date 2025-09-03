import type { Enum } from "../../../types/enum";
import APIManager from "../APIManager";

export const GlobalPermissions = {
    Administrator: "ADMINISTRATOR",
    AccessDashboard: "ACCESS_DASHBOARD",
    UploadFiles: "UPLOAD_FILES",
    DownloadFiles: "DOWNLOAD_FILES",
    ManageUsers: "MANAGE_USERS",
    EditProfile: "EDIT_PROFILE",
    ViewAPIDocs: "VIEW_API_DOCS", 
    CreateContent: "CREATE_CONTENT",
    EditContent: "EDIT_CONTENT",
    DeleteContent: "DELETE_CONTENT",
    CreateContentFolders: "CREATE_CONTENT_FOLDERS",
    EditContentFolders: "EDIT_CONTENT_FOLDERS",
    DeleteContentFolders: "DELETE_CONTENT_FOLDERS"
}

export type GlobalPermissions = Enum<typeof GlobalPermissions>;

type PermissionsObject<Permissions extends string> = { [key in Permissions]: boolean }//Map<Permissions, boolean>;
export type GlobalPermissionsObject = PermissionsObject<GlobalPermissions>;

export class Permission {
    static async me(): Promise<GlobalPermissionsObject|undefined> {
        try {
            let res = await APIManager.request({
                method: "get",
                url: "/permission/me"
            });

            if (res) return res.data as GlobalPermissionsObject;
            else return undefined;
        } catch {
            return undefined;
        }
    }
}
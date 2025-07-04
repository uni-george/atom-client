/**
 * Object for storing user data.
 */
export type User = {
    /**
     * The user's ID.
     */
    id: string;
    /**
     * The user's display name.
     */
    name: string;
    /**
     * The user's avatar ID.
     */
    avatarID?: string;
}
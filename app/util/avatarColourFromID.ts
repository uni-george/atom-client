import Color from "color";

export const avatarColourFromID = (id: string): string => {
    let hash = 0;

    for (let i = 0; i < id.length; i++) {
        hash = id.charCodeAt(i) + ((hash << 5) - hash);
    }

    let colour = "#";
    for (let i = 0; i < 3; i++) {
        let value = (hash >> (i * 8)) & 0xff;
        colour += ("00" + value.toString(16)).slice(-2);
    }
    const out = Color(colour).desaturate(0.3).hex();
    return out;
}
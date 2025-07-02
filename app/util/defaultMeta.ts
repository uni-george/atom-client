const defaultMeta = [
    { title: "atom" },
    { name: "title", content: "atom" },
    { name: "description", content: "atom CMS" },
    /* open graph */
    { property: "og:type", content: "website" },
    { property: "og:title", content: "atom" },
    { property: "og:description", content: "atom CMS" },
    { property: "og:image", content: "/android-chrome-512x512.png" },
    /* twitter */
    { property: "twitter:card", content: "summary_large_image" },
    { property: "twitter:title", content: "atom" },
    { property: "twitter:description", content: "atom CMS" },
    { property: "twitter:image", content: "/android-chrome-512x512.png" },
];

export const getDefaultMeta = (title: string = "atom") => {
    return [
        { title },
        { name: "title", content: title },
        { name: "description", content: "atom CMS" },
        /* open graph */
        { property: "og:type", content: "website" },
        { property: "og:title", content: title },
        { property: "og:description", content: "atom CMS" },
        { property: "og:image", content: "/android-chrome-512x512.png" },
        /* twitter */
        { property: "twitter:card", content: "summary_large_image" },
        { property: "twitter:title", content: title },
        { property: "twitter:description", content: "atom CMS" },
        { property: "twitter:image", content: "/android-chrome-512x512.png" },
    ]
}

export default defaultMeta;
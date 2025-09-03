import { useEffect, useState, type ReactNode } from "react";
import type { ContentFolderObject, ContentObject, ContentPath } from "../../../managers/api/Content";
import { Link, Sheet, Stack, Table, Typography } from "@mui/joy";
import { noResultsKaomoji } from "../../../util/noResultsKaomoji";
import { CalculateRounded, FolderRounded, KeyboardArrowDownRounded, TranslateRounded } from "@mui/icons-material";
import { useNavigate } from "react-router";

export const ContentSystemTable = ({ folders, content, path }: { folders: ContentFolderObject[], content: ContentObject[], path?: ContentPath }): ReactNode => {
    const [sortDirection, setSortDirection] = useState<"ascending" | "descending">("ascending");
    const [sortBy, setSortBy] = useState<"name">("name");

    const [noResultsIndex, setNoResultsIndex] = useState<number>(0);
    
    useEffect(() => {
        setNoResultsIndex(Math.floor(Math.random() * noResultsKaomoji.length));
    }, []);

    return (
        <Sheet
            variant="outlined"
            sx={{
                width: 1,
                borderRadius: "sm",
                flexShrink: 1,
                overflow: "auto",
                minHeight: 0
            }}
        >
            <Table
                stickyHeader
                hoverRow
                sx={{
                    "--TableCell-headBackground": "var(--atom-palette-background-level1)",
                    "--TableRow-hoverBackground": "var(--atom-palette-background-level1)",
                    "--Table-headerUnderlineThickness": "1px",
                    "--TableCell-paddingY": "8px",
                    "--TableCell-paddingX": "8px"
                }}
            >
                <thead>
                    <tr>
                        <th
                            style={{
                                padding: "12px 6px",
                                width: 60
                            }}
                        />
                        <th
                            style={{
                                padding: "12px 6px"
                            }}
                        >
                            <Link
                                underline="none"
                                color="neutral"
                                component="button"
                                onClick={() => {
                                    if (sortBy == "name") setSortDirection(sortDirection == "ascending" ? "descending" : "ascending");
                                    setSortBy("name");
                                }}
                                endDecorator={
                                    sortBy == "name" ? <KeyboardArrowDownRounded /> : null
                                }
                                sx={[
                                    {
                                        fontWeight: "lg",
                                        "& svg": {
                                            transition: "0.2s",
                                            transform: sortDirection == "descending" ? "rotate(0deg)" : "rotate(180deg)"
                                        }
                                    }
                                ]}
                                textColor="text.secondary"
                            >
                                name
                            </Link>
                        </th>
                        <th
                            style={{
                                padding: "12px 6px"
                            }}
                        >
                            <Typography
                                sx={{
                                    fontWeight: "lg",
                                }}
                                textColor="text.secondary"
                            >
                                type
                            </Typography>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        path && path.length > 1 ?
                        <FolderRow 
                            folder={{
                                id: path[path.length - 2].id,
                                name: ".."
                            }}
                        />
                        : path && path.length == 1 ?
                        <FolderRow 
                            folder={{
                                id: "",
                                name: ".."
                            }}
                        />
                        : null
                    }
                    {
                        [...folders].sort((a, b) => 
                            (sortDirection == "ascending" ? 1 : -1) * (a[sortBy].toString().toUpperCase() < b[sortBy].toString().toUpperCase() ? -1 : a[sortBy].toString().toUpperCase() > b[sortBy].toString().toUpperCase() ? 1 : 0)
                        ).map(x => (
                            <FolderRow
                                key={x.id}
                                folder={x}
                            />
                        ))
                    }
                    {
                        [...content].sort((a, b) => 
                            (sortDirection == "ascending" ? 1 : -1) * ((a[sortBy] || a.id).toString().toUpperCase() < (b[sortBy] || b.id).toString().toUpperCase() ? -1 : (a[sortBy] || a.id).toString().toUpperCase() > (b[sortBy] || b.id).toString().toUpperCase() ? 1 : 0)
                        ).map(x => (
                            <ContentRow
                                key={x.id}
                                content={x}
                            />
                        ))
                    }
                </tbody>
            </Table>
            {
                !folders.length && !content.length ? 
                    <Stack
                        sx={{
                            p: 3
                        }}
                    >
                        <Typography
                            sx={{
                                textAlign: "center",
                                mb: 2
                            }}
                            level="h3"
                            textColor="text.tertiary"
                            component="code"
                        >
                            {
                                noResultsKaomoji[noResultsIndex]
                            }
                        </Typography>
                        <Typography
                            sx={{
                                textAlign: "center"
                            }}
                            level="body-md"
                            textColor="text.tertiary"
                        >
                            no items
                        </Typography>
                    </Stack>
                : null
            }
        </Sheet>
    )
}

const FolderRow = ({ folder }: { folder: ContentFolderObject }): ReactNode => {
    const navigate = useNavigate();
    
    return (
        <tr
            style={{
                cursor: "pointer"
            }}
            onClick={() => {
                navigate(`/dashboard/content/folder/${folder.id}`)
            }}
        >
            <td>
                <Stack
                    direction="row"
                    justifyContent="center"
                >
                    <FolderRounded
                        sx={{
                            fontSize: 20
                        }}
                    />
                </Stack>
            </td>
            <td>
                {
                    <Typography
                        level="body-sm"
                        textColor="text.primary"
                        noWrap
                        overflow="hidden"
                    >
                        { folder.name }
                    </Typography>
                }
            </td>
            <td>
                <Typography>
                    folder
                </Typography>
            </td>
        </tr>
    );
}

const ContentRow = ({ content }: { content: ContentObject }): ReactNode => {
    const navigate = useNavigate();
    
    const iconSx = {
        fontSize: 20
    };

    console.log(content)

    return (
        <tr
            style={{
                cursor: "pointer"
            }}
            onClick={() => {
                navigate(`/dashboard/content/${content.id}`)
            }}
        >
            <td>
                <Stack
                    direction="row"
                    justifyContent="center"
                >
                    {
                        content.type == "string" ? <TranslateRounded sx={iconSx} /> : <CalculateRounded sx={iconSx} />
                    }
                </Stack>
            </td>
            <td>
                <Typography
                    level="body-sm"
                    textColor="text.primary"
                    noWrap
                    overflow="hidden"
                >
                    { content.name || content.id }
                </Typography>
            </td>
            <td>
                <Typography>
                    { content.type == "number" ? "number content" : "string content" }
                </Typography>
            </td>
        </tr>
    );
}
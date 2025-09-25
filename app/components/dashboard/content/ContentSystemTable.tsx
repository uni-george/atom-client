import React, { useEffect, useState, type CSSProperties, type MouseEventHandler, type ReactNode, type TdHTMLAttributes } from "react";
import type { ContentFolderObject, ContentObject, ContentPath } from "../../../managers/api/Content";
import { Divider, Dropdown, IconButton, Link, Menu, MenuButton, MenuItem, Sheet, Stack, Table, Typography } from "@mui/joy";
import { noResultsKaomoji } from "../../../util/noResultsKaomoji";
import { CalculateRounded, FolderRounded, KeyboardArrowDownRounded, MoreHoriz, TranslateRounded } from "@mui/icons-material";
import { useNavigate } from "react-router";
import { GlobalPermissionCheck } from "../../../pages/dashboard/GlobalPermissionCheck";
import { GlobalPermissions } from "../../../managers/api/Permission";
import APIManager from "../../../managers/APIManager";

export const ContentSystemTable = ({ folders, content, path, reload }: { folders: ContentFolderObject[], content: ContentObject[], path?: ContentPath, reload: () => void }): ReactNode => {
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
                        <th
                            style={{
                                width: 60
                            }}
                        >

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
                            tdStyle={{
                                borderBottom: "1px solid var(--TableCell-borderColor)"
                            }}
                            noMore
                        />
                        : path && path.length == 1 ?
                        <FolderRow 
                            folder={{
                                id: "../",
                                name: ".."
                            }}
                            tdStyle={{
                                borderBottom: "1px solid var(--TableCell-borderColor)"
                            }}
                            noMore
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
                                reload={reload}
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

const FolderRow = ({ folder, tdStyle, noMore = false, reload }: { folder: ContentFolderObject, tdStyle?: CSSProperties, noMore?: boolean, reload?: () => void }): ReactNode => {
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
            <td
                style={tdStyle}
            >
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
            <td
                style={tdStyle}
            >
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
            <td
                style={tdStyle}
            >
                <Typography>
                    folder
                </Typography>
            </td>
            <td
                style={{
                    padding: "0px 4px",
                    ...tdStyle
                }}
            >
                {
                    !noMore &&
                    <FolderRowEditMenu
                        onOpen={() => {
                            navigate(`/dashboard/content/folder/${folder.id}`)
                        }}

                        onDelete={async () => {
                            await APIManager.content.deleteFolder(folder.id);
                            reload?.();
                        }}
                    />
                }
            </td>
        </tr>
    );
}

const ContentRow = ({ content }: { content: ContentObject }): ReactNode => {
    const navigate = useNavigate();
    
    const iconSx = {
        fontSize: 20
    };

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
            <td>

            </td>
        </tr>
    );
}

const FolderRowEditMenu = ({ onOpen, onRename, onMove, onDelete }: { onOpen?: MouseEventHandler, onRename?: MouseEventHandler, onMove?: MouseEventHandler, onDelete?: MouseEventHandler }): ReactNode => {
    return (
        <Dropdown>
            <Stack>
                <MenuButton
                    slots={{
                        root: IconButton
                    }}
                    slotProps={{
                        root: {
                            onClick: e => {
                                e.stopPropagation();
                            },
                            size: "sm"
                        }
                    }}
                >
                    <MoreHoriz />
                </MenuButton>
                <Menu
                    size="sm"
                    keepMounted
                >
                    <MenuItem
                        onClick={e => {
                            e.stopPropagation();
                            onOpen?.(e);
                        }}
                    >
                        open
                    </MenuItem>
                    <GlobalPermissionCheck
                        permissions={[
                            GlobalPermissions.EditContentFolders
                        ]}
                        discreet
                    >
                        <MenuItem
                            onClick={e => {
                                e.stopPropagation();
                                onRename?.(e);
                            }}
                        >
                            rename
                        </MenuItem>
                        <MenuItem
                            onClick={e => {
                                e.stopPropagation();
                                onMove?.(e);
                            }}
                        >
                            move
                        </MenuItem>
                    </GlobalPermissionCheck>
                    <GlobalPermissionCheck
                        permissions={[
                            GlobalPermissions.DeleteContentFolders
                        ]}
                        discreet
                    >
                        <Divider />
                        <MenuItem
                            color="danger"
                            onClick={e => {
                                e.stopPropagation();
                                onDelete?.(e);
                            }}
                        >
                            delete
                        </MenuItem>
                    </GlobalPermissionCheck>
                </Menu>
            </Stack>
        </Dropdown>
    );
}
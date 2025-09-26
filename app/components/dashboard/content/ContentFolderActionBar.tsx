import { type MouseEventHandler, type ReactNode } from "react";
import type { ContentPath } from "../../../managers/api/Content";
import { Box, Breadcrumbs, Button, Dropdown, FormControl, IconButton, Menu, MenuButton, MenuItem, Link as MUILink, Stack, Typography } from "@mui/joy";
import { AddRounded, FolderRounded, MoreHorizRounded } from "@mui/icons-material";
import { Link } from "react-router";
import { GlobalPermissionCheck } from "../../../pages/dashboard/GlobalPermissionCheck";
import { GlobalPermissions } from "../../../managers/api/Permission";

interface ContentFolderActionBarProps {
    onNewFolder?: MouseEventHandler;
    onNewContent?: MouseEventHandler;
    path?: ContentPath;
}

export const ContentFolderActionBar = ({ path, onNewFolder, onNewContent }: ContentFolderActionBarProps): ReactNode => {
    return (
        <Stack
            direction={{
                sm: "row",
                xs: "column"
            }}
            justifyContent="space-between"
            gap={1.5}
            sx={{
                pb: 2,
                maxWidth: "100%"
            }}
        >
            <Box
                sx={{
                    flexGrow: 1,
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                    flexDirection: "row",
                    maxWidth: {
                        xs: 1,
                        sm: "calc(100% - ((2 * 140px) + (2 * 1.5 * var(--atom-spacing))))"
                    }
                }}
            >
                <Link
                    to={"/dashboard/content"}
                >
                    <MUILink
                        component="div"
                        level="h3"
                        textColor="text.primary"
                        sx={{
                            width: "fit-content"
                        }}
                    >
                        /
                    </MUILink>
                </Link>
                {
                    path && path.length ?
                        <PathBreadcrumbs
                            path={path}
                        />
                    : null
                }
            </Box>
            <Box
                sx={{
                    display: "flex",
                    gap: 1.5,
                    justifyContent: {
                        xs: "start",
                        sm: "end"
                    },
                    alignItems: "center",
                    "& button": {
                        width: "140px"
                    },
                    minWidth: "calc((2 * 140px) + (1.5 * var(--atom-spacing)))"
                }}
            >
                <GlobalPermissionCheck
                    permissions={[
                        GlobalPermissions.CreateContentFolders
                    ]}
                    discreet
                >
                    <FormControl>
                        <Button
                            startDecorator={
                                <FolderRounded />
                            }
                            color="success"
                            variant="outlined"
                            onClick={onNewFolder}
                        >
                            new folder
                        </Button>
                    </FormControl>
                </GlobalPermissionCheck>
                <GlobalPermissionCheck
                    permissions={[
                        GlobalPermissions.CreateContent
                    ]}
                    discreet
                >
                    <FormControl>
                        <Button
                            startDecorator={
                                <AddRounded />
                            }
                            color="success"
                            onClick={onNewContent}
                        >
                            new content
                        </Button>
                    </FormControl>
                </GlobalPermissionCheck>
            </Box>
        </Stack>
    );
}

export const PathBreadcrumbs = ({ path }: { path: ContentPath }): ReactNode => {
    if (path.length < 3) {
        return (
            <Breadcrumbs
                separator={
                    <Typography
                        level="h3"
                    >
                        /
                    </Typography>
                }
                sx={{
                    width: "fit-content",
                    maxWidth: "calc(100% - 9px)",
                    flexGrow: 1,
                    p: 0,
                    pl: 1,
                    "& li": {
                        maxWidth: {
                            xs: "calc(100% / 2)"
                        }
                    }
                }}
            >
                {
                    path.map((x, i, a) =>
                        <Link
                            to={`/dashboard/content/folder/${x.id}`}
                            style={{
                                width: "100%"
                            }}
                        >
                            <MUILink
                                component="div"
                                level="h3"
                                maxWidth={1}
                                textColor={i == a.length - 1 ? "text.primary" : undefined}
                            >
                                <Typography
                                    noWrap
                                    maxWidth={1}
                                >
                                    { x.name }
                                </Typography>
                            </MUILink>
                        </Link>
                    )
                }
            </Breadcrumbs>
        );
    }

    let menuPath = [...path];
    menuPath.shift();
    menuPath.pop();

    return (
        <Dropdown>
            <Menu>
                {
                    menuPath.map(x => 
                        <Link
                            to={`/dashboard/content/folder/${x.id}`}
                            style={{
                                textDecoration: "none"
                            }}
                        >
                            <MenuItem>
                                <MUILink
                                    component="div"
                                >
                                    { x.name }
                                </MUILink>
                            </MenuItem>
                        </Link>
                            
                    )
                }
            </Menu>

            <Breadcrumbs
                separator={
                    <Typography
                        level="h3"
                    >
                        /
                    </Typography>
                }
                sx={{
                    p: 0,
                    pl: 1,
                    maxWidth: "calc(100% - 9px)",
                    flexGrow: 1,
                    "& li": {
                        maxWidth: {
                            xs: "calc(100% / 3)"
                        }
                    }
                }}
            >
                {          
                    // very cursed
                    // @ts-expect-error          
                    [].concat(...[
                        path[0],
                        path[path.length - 1]
                    ].map((x, i, a) =>
                        <Link
                            to={`/dashboard/content/folder/${x.id}`}
                            style={{
                                width: "100%"
                            }}
                        >
                            <MUILink
                                component="div"
                                level="h3"
                                maxWidth={1}
                                textColor={i == a.length - 1 ? "text.primary" : undefined}
                            >
                                <Typography
                                    noWrap
                                    maxWidth={1}
                                >
                                    { x.name }
                                </Typography>
                            </MUILink>
                        </Link>
                    )).map(x => [x, (
                        <MenuButton
                            slots={{
                                root: IconButton
                            }}
                            slotProps={{
                                root: {
                                    color: "primary",
                                    variant: "plain"
                                }
                            }}
                        >
                            <MoreHorizRounded
                                sx={{
                                    fontSize: "24px"
                                }}
                            />
                        </MenuButton>
                    )]).flat().slice(0, -1)
                }
            </Breadcrumbs>
        </Dropdown>
    );
}
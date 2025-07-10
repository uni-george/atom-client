import { Avatar, Box, Button, CircularProgress, IconButton, Link, Sheet, Stack, Table, Typography } from "@mui/joy";
import React, { useEffect, useState, type ReactNode } from "react";
import type { User } from "../../../../types/user";
import APIManager from "../../../managers/APIManager";
import { type UserSearchProperties, type UserSearchSortDirection } from "../../../managers/api/User";
import { useDebouncedCallback } from "use-debounce";
import { ImageRounded, KeyboardArrowDownRounded, KeyboardArrowLeftRounded, KeyboardArrowRightRounded } from "@mui/icons-material";
import { useNavigate, useSearchParams } from "react-router";
import millify from "millify";

const noUsersKaomoji = [
    "Σ(°∇°?!)",
    "∘ ∘ ∘ ( °ヮ° ) ?",
    "(O_O)!",
    "(＃°Д°)",
    "（*゜ー゜*）",
    "(°ー°〃)",
    "(。_。)",
    "ㄟ( ▔, ▔ )ㄏ",
    "(￣_￣|||)"
];

interface AllUserTableProps {
    nameSearch?: string;
    limit?: number;
    page?: number;
    setPage?: React.Dispatch<React.SetStateAction<number>>;
}

export const AllUserTable = ({ nameSearch, limit, page = 1, setPage }: AllUserTableProps): ReactNode => {
    const [users, setUsers] = useState<User[] | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true);
    const [numResults, setNumResults] = useState<number>(0);

    const [sortDirection, setSortDirection] = useState<UserSearchSortDirection>("ascending");
    const [sortBy, setSortBy] = useState<UserSearchProperties>("name");

    const [noUsersIndex, setNoUsersIndex] = useState<number>(0);

    const [searchParams, setSearchParams] = useSearchParams();

    const loadUsers = useDebouncedCallback(async () => {
        setLoading(true);

        limit ||= 10;

        let searchOptions = {
            sortDirection,
            sortBy,
            name: nameSearch || undefined,
            limit,
            offset: limit * (page - 1)
        };

        let apiUsers = await APIManager.user.search(searchOptions);
        let apiNumResults = await APIManager.user.count(searchOptions);

        setUsers(apiUsers);
        setNumResults(apiNumResults || 0);
        setNoUsersIndex(Math.floor(Math.random() * noUsersKaomoji.length));
        setLoading(false);
    }, 500, { leading: false });

    useEffect(() => {
        setLoading(true);
        loadUsers();
    }, [nameSearch, limit, page]);

    useEffect(() => {
        if (!loading) {
            if ((page - 1) * (limit || 0) + 1 > numResults) {
                let newPage = Math.max(1, Math.ceil(numResults / (limit || 10)));
                setPage?.(newPage);
                searchParams.set("page", newPage.toString());
                setSearchParams(searchParams);
            }
        }
    }, [loading, page, numResults, limit])

    return (
        <Stack
            gap={2}
        >
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
                                    width: 60,
                                    padding: "12px 6px"
                                }}
                            >
                                <Stack
                                    justifyContent="center"
                                    alignItems="center"
                                    sx={{
                                        
                                        "& > svg": {
                                            color: "text.secondary"
                                        }
                                    }}
                                >
                                    <ImageRounded /> 
                                </Stack>
                            </th>
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
                                        loadUsers();
                                    }}
                                    endDecorator={
                                        <KeyboardArrowDownRounded />
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
                            <th>
                                test
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            !loading ? users?.map(x => (
                                <UserRow
                                    user={x}
                                    key={x.id}
                                />
                            ))
                            : null
                        }
                    </tbody>
                </Table>
                {
                    loading ?
                        <Stack
                            justifyContent="center"
                            alignItems="center"
                            width={1}
                            height={1}
                            sx={{
                                p: 3
                            }}
                        >
                            <CircularProgress />
                        </Stack>
                    : !users?.length ? (
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
                                    noUsersKaomoji[noUsersIndex]
                                }
                            </Typography>
                            <Typography
                                sx={{
                                    textAlign: "center"
                                }}
                                level="body-md"
                                textColor="text.tertiary"
                            >
                                no users
                            </Typography>
                        </Stack>
                    ) : null
                }
            </Sheet>

            {
                !loading ?
                <Stack
                    direction="row"
                    gap={1}
                    justifyContent="space-between"
                >
                    <Box
                        flexGrow={1}
                        flexBasis={0}
                    >
                        <Button
                            size="sm"
                            variant="outlined"
                            color="neutral"
                            startDecorator={
                                <KeyboardArrowLeftRounded />
                            }
                            onClick={() => {
                                setPage?.(page - 1);
                                searchParams.set("page", (page - 1).toString());
                                setSearchParams(searchParams);
                            }}
                            disabled={page <= 1}
                        >
                            previous
                        </Button>
                    </Box>

                    
                    <Stack
                        direction="row"
                        justifyContent="center"
                        gap={1}
                    >
                        {
                            [1, "...", ...[...Array(5).keys()].map(x => x - 2).map(x => page + x).filter(x => x > 0 && x <= Math.ceil(numResults / (limit || 10))), "...", Math.ceil(numResults / (limit || 10))].filter((x, i, a) => {
                                if (i == 0) {
                                    if (a[i + 2] == x) return false;
                                    return true;
                                }
                                if (typeof x == "string") {
                                    if (a[i - 1] == (a[i + 1] as number - 1) || a[i - 1] == a[i + 1]) return false;
                                    return true;
                                }
                                if (i == a.length - 1) {
                                    if (a[i - 2] == x) return false;
                                    return true;
                                }
                                return true;
                            }).map(x => (
                                <IconButton
                                    key={x}
                                    size="sm"
                                    color="neutral"
                                    variant={typeof x == "number" ? "outlined" : "plain"}
                                    sx={{
                                        aspectRatio: 1,
                                        color: page == x ? "background.body" : "text.secondary",
                                        borderRadius: "50%",
                                        bgcolor: page == x ? "text.primary" : "transparent",
                                        borderColor: page == x ? "text.primary" : "neutral.outlineBorder",
                                        "&:hover": {
                                            bgcolor: page == x ? "neutral.plainHoverColor" : "neutral.outlinedHoverColor"
                                        },
                                        userSelect: typeof x == "number" ? "none" : "unset"
                                    }}
                                    onClick={() => {
                                        if (typeof x != "number") return;
                                        if (!loading) {
                                            setPage?.(x);
                                            searchParams.set("page", x.toString());
                                            setSearchParams(searchParams);
                                        }
                                    }}
                                >
                                    { x }
                                </IconButton>
                            ))
                        }
                    </Stack>
                    
                    <Box
                        flexGrow={1}
                        flexBasis={0}
                        display="flex"
                        justifyContent="end"
                    >
                        <Button
                            size="sm"
                            variant="outlined"
                            color="neutral"
                            endDecorator={
                                <KeyboardArrowRightRounded />
                            }
                            onClick={() => {
                                setPage?.(page + 1);
                                searchParams.set("page", (page + 1).toString());
                                setSearchParams(searchParams);
                            }}
                            disabled={page * (limit || 0) + 1 > numResults}
                        >
                            next
                        </Button>
                    </Box>
                </Stack>
                : null
            }
            {
                !loading ?
                    <Typography
                        textAlign="center"
                        level="body-xs"
                    >
                        showing {(page - 1) * (limit || 0) + 1} to {Math.min((page - 1) * (limit || 0) + (limit || 0), numResults)} of {millify(numResults, { precision: 2 })} users
                    </Typography>
                    :
                    null
            }
        </Stack>
    );
}

interface UserRowProps {
    user: User;
}

const UserRow = ({ user }: UserRowProps): ReactNode => {
    const [avatarURL, setAvatarURL] = useState<string|undefined>(undefined);
    const navigate = useNavigate();

    useEffect(() => {
        setAvatarURL(undefined);
        if (user.avatarID) APIManager.image.getURL(user.avatarID || "").then(x => {
            setAvatarURL(x);
        })
    }, [user.avatarID]);

    return (
        <tr
            onClick={() => {
                navigate(user.id);
            }}
        >
            <td>
                <Stack
                    direction="row"
                    justifyContent="center"
                >
                    <Avatar
                        src={avatarURL}
                    >
                        {user.name?.slice?.(0, 1)?.toUpperCase()}
                    </Avatar>
                </Stack>
            </td>
            <td>
                {
                    user.name ?
                        <Typography
                            level="body-sm"
                            textColor="text.primary"
                            noWrap
                            overflow="hidden"
                        >
                            {user.name}
                        </Typography>
                    :
                        <Typography
                            level="body-sm"
                            textColor="text.tertiary"
                        >
                            &lt;unnamed user&gt;
                        </Typography>
                }
            </td>
            <td>
                ok
            </td>
        </tr>
    );
}
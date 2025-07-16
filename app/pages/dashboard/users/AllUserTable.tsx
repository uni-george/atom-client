import { Avatar, CircularProgress, Link, Sheet, Stack, Table, Typography } from "@mui/joy";
import React, { useEffect, useState, type ReactNode } from "react";
import type { User } from "../../../../types/user";
import APIManager from "../../../managers/APIManager";
import { type UserSearchProperties, type UserSearchSortDirection } from "../../../managers/api/User";
import { useDebouncedCallback } from "use-debounce";
import { ImageRounded, KeyboardArrowDownRounded } from "@mui/icons-material";
import { useNavigate, useSearchParams } from "react-router";
import millify from "millify";
import { Paginator } from "../../../components/Paginator/Paginator";
import { noResultsKaomoji as noUsersKaomoji } from "../../../util/noResultsKaomoji";


interface AllUserTableProps {
    nameSearch?: string;
    limit?: number;
    page?: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
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
    }, [nameSearch, limit, page, sortBy, sortDirection]);

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
                                        height: 1,
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
                                <Link
                                    underline="none"
                                    color="neutral"
                                    component="button"
                                    endDecorator={
                                        sortBy == "id" ? <KeyboardArrowDownRounded /> : null
                                    }
                                    sx={{
                                        fontWeight: "lg",
                                        "& svg": {
                                            transition: "0.2s",
                                            transform: sortDirection == "descending" ? "rotate(0deg)" : "rotate(180deg)"
                                        }
                                    }}
                                    textColor="text.secondary"
                                    onClick={() => {
                                        if (sortBy == "id") setSortDirection(sortDirection == "ascending" ? "descending" : "ascending");
                                        setSortBy("id");
                                    }}
                                >
                                    id
                                </Link>
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
                <Paginator
                    page={page}
                    setPage={setPage}
                    numPages={Math.ceil(numResults / (limit || 10))}
                    includeButtons
                />
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
            style={{
                cursor: "pointer"
            }}
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
                <Typography
                    level="body-sm"
                    textColor="text.tertiary"
                    noWrap
                    overflow="hidden"
                >
                    { user.id }
                </Typography>
            </td>
        </tr>
    );
}
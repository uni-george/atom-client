import { Avatar, CircularProgress, Link, Sheet, Stack, Table, Typography } from "@mui/joy";
import { useEffect, useState, type ReactNode } from "react";
import type { User } from "../../../../types/user";
import APIManager from "../../../managers/APIManager";
import { type UserSearchProperties, type UserSearchSortDirection } from "../../../managers/api/User";
import { useDebouncedCallback } from "use-debounce";
import { ImageRounded, KeyboardArrowDownRounded } from "@mui/icons-material";
import { useNavigate } from "react-router";

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
}

export const AllUserTable = ({ nameSearch, limit }: AllUserTableProps): ReactNode => {
    const [users, setUsers] = useState<User[] | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true);

    const [sortDirection, setSortDirection] = useState<UserSearchSortDirection>("ascending");
    const [sortBy, setSortBy] = useState<UserSearchProperties>("name");

    const [noUsersIndex, setNoUsersIndex] = useState<number>(0);

    const loadUsers = useDebouncedCallback(async () => {
        setLoading(true);

        limit ||= 10;

        let apiUsers = await APIManager.user.search({
            sortDirection,
            sortBy,
            name: nameSearch || undefined,
            limit
        });

        setUsers(apiUsers);
        setNoUsersIndex(Math.floor(Math.random() * noUsersKaomoji.length))
        setLoading(false);
    }, 500, { leading: false });

    useEffect(() => {
        loadUsers();
    }, [nameSearch, limit])

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
                        {user.name?.slice?.(0, 1)}
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
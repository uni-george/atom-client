import { useEffect, useState, type ReactNode } from "react";
import { AllUserTable } from "./AllUserTable";
import { Box, Divider, FormControl, FormLabel, Input, Option, Select } from "@mui/joy";
import { DashboardMainContent } from "../../../components/dashboard/DashboardMainContent/DashboardMainContent";
import { GlobalPermissionCheck } from "../GlobalPermissionCheck";
import { GlobalPermissions } from "../../../managers/api/Permission";
import { SearchRounded } from "@mui/icons-material";
import { useSearchParams } from "react-router";
import validator from "validator";

export const UsersPage = (): ReactNode => {
    const [nameSearch, setNameSearch] = useState<string | undefined>(undefined);
    const [numPerPage, setNumPerPage] = useState<number>(10);
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        if (searchParams.get("limit")) {
            if (validator.isInt(searchParams.get("limit") || "")) {
                setNumPerPage(parseInt(searchParams.get("limit") || ""));
            }
        }

        if (searchParams.get("name")) {
            setNameSearch(searchParams.get("name") || undefined);
        }
    }, []);

    return (
        <>
            <Divider />
            <DashboardMainContent>
                <GlobalPermissionCheck
                    centerVertically
                    permissions={[
                        GlobalPermissions.ManageUsers
                    ]}
                >
                    <Box
                        sx={{
                            minHeight: 1,
                            minWidth: 1
                        }}
                    >
                        <Box
                            sx={{
                                borderRadius: "sm",
                                py: 2,
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 1.5,
                                "& > *": {
                                    minWidth: {
                                        xs: "120px",
                                        md: "160px"
                                    }
                                }
                            }}
                        >
                            <FormControl
                                size="sm"
                                sx={{
                                    flex: 1
                                }}
                            >
                                <FormLabel>search for user</FormLabel>
                                <Input
                                    size="sm"
                                    placeholder="search"
                                    startDecorator={<SearchRounded />}
                                    value={nameSearch}
                                    onChange={e => {
                                        setNameSearch(e.target.value);
                                        searchParams.set("name", e.target.value);
                                        setSearchParams(searchParams);
                                    }}
                                />
                            </FormControl>
                            
                            <FormControl size="sm">
                                <FormLabel>users per page</FormLabel>
                                <Select
                                    size="sm"
                                    slotProps={{
                                        button: {
                                            sx: {
                                                whiteSpace: "nowrap"
                                            }
                                        }
                                    }}
                                    value={numPerPage}
                                    onChange={(_e, newValue) => {
                                        setNumPerPage(newValue || 10);
                                        searchParams.set("limit", newValue?.toString() || "");
                                        setSearchParams(searchParams);
                                    }}
                                >
                                    <Option value={5}>5</Option>
                                    <Option value={10}>10</Option>
                                    <Option value={15}>15</Option>
                                    <Option value={20}>20</Option>
                                    <Option value={25}>25</Option>
                                </Select>
                            </FormControl>
                        </Box>

                        <AllUserTable
                            nameSearch={nameSearch}
                            limit={numPerPage}
                        />
                    </Box>
                </GlobalPermissionCheck>
            </DashboardMainContent>
        </>
    );
}
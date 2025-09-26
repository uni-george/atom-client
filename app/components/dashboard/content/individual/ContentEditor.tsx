import { Box, Button, Card, CardActions, Divider, FormControl, FormHelperText, FormLabel, Input, Tab, tabClasses, TabList, TabPanel, tabPanelClasses, Tabs, Textarea, Tooltip, Typography } from "@mui/joy";
import { useState, type Dispatch, type ReactNode, type SetStateAction } from "react";
import type { ContentObject } from "../../../../managers/api/Content";
import MDEditor from "@uiw/react-md-editor";
import { GlobalPermissionCheck } from "../../../../pages/dashboard/GlobalPermissionCheck";
import { GlobalPermissions } from "../../../../managers/api/Permission";

interface ContentEditorProps {
    remoteData: ContentObject;
    newName?: string;
    setNewName?: Dispatch<SetStateAction<string>>;
    newType?: "string" | "number";
    setNewType?: Dispatch<SetStateAction<"string" | "number">>;
    newData?: string | number;
    setNewData?: Dispatch<SetStateAction<string | number | undefined>>;
    onSaveNewData?: () => void;
}

export const ContentEditor = ({ remoteData, newData, setNewData, onSaveNewData }: ContentEditorProps): ReactNode => {
    const [mdHeight, setMDHeight] = useState<number>(200);

    return (
        <Card
            sx={{
                width: 1
            }}
        >
            <Box>
                <Typography
                    level="title-md"
                >
                    content data
                </Typography>
                <Typography
                    level="body-sm"
                >
                    change the data stored in this bit of content
                </Typography>
            </Box>
            <Divider />
            <FormControl>
                <FormLabel>data</FormLabel>
                {
                    {
                        "string": (
                            <Tabs
                                sx={{
                                    [`& .${tabPanelClasses.root}`]: {
                                        px: 0
                                    }
                                }}
                            >
                                <TabList
                                    tabFlex={1}
                                    size="sm"
                                    sx={{
                                        [`& .${tabClasses.root}`]: {
                                            fontWeight: 600,
                                            flex: "initial",
                                            justifyContent: "left",
                                            color: "text.tertiary",
                                            borderRadius: "6px 6px 0 0",
                                            [`&.${tabClasses.selected}`]: {
                                                bgcolor: "transparent",
                                                color: "text.primary",
                                                "&::after": {
                                                    height: "2px",
                                                    bgcolor: "primary.500"
                                                }
                                            }
                                        }
                                    }}
                                >
                                    <Tab value={0} indicatorInset>text</Tab>
                                    <Tab value={1} indicatorInset>markdown</Tab>
                                </TabList>
                                <TabPanel
                                    value={0}
                                >
                                    <Textarea
                                        minRows={5}
                                        endDecorator={
                                            <Typography
                                                level="body-xs"
                                                textColor={ (newData?.toString().length || 0) > 8192 ? "danger.500" : "text.tertiary" }
                                                sx={{
                                                    ml: "auto"
                                                }}
                                            >
                                                { newData?.toString().length || 0 } / 8192 characters
                                            </Typography>
                                        }
                                        value={newData}
                                        onChange={e => setNewData?.(e.target.value)}
                                    />
                                </TabPanel>
                                <TabPanel
                                    value={1}
                                >
                                    <Box
                                        sx={{
                                            // "pre.w-md-editor-text-pre, .w-md-editor-text-input, .w-md-editor-text > .w-md-editor-text-pre": {
                                            ".w-md-editor-text *": {
                                                fontFamily: "var(--md-editor-font-family) !important"
                                            }
                                        }}
                                    >
                                        <MDEditor
                                            value={(newData || "") as string}
                                            onChange={val => setNewData?.(val)}
                                            height={mdHeight}
                                            onHeightChange={h => setMDHeight(h as number)}
                                        />
                                    </Box>
                                </TabPanel>
                            </Tabs>
                        ),
                        "number": (
                            <Input />
                        )
                    }[remoteData.type]
                }
                <FormHelperText
                    sx={{
                        display: "inline-block"
                    }}
                >
                    <Typography
                        level="body-xs"
                        sx={{
                            width: "fit-content",
                            maxWidth: 1
                        }}
                    >
                        this content will be served at:
                    </Typography>
                    <Tooltip
                        title="click to copy"
                        arrow
                        variant="outlined"
                    >
                        <Typography
                            component="code"
                            level="body-xs"
                            sx={{
                                width: "fit-content",
                                maxWidth: 1,
                                overflow: "hidden",
                                textOverflow: "ellipsis"
                            }}
                            onClick={() => {
                                navigator.clipboard.writeText(`{window.location.hostname}/api/v1/content/{remoteData.id}`);
                            }}
                        >
                            {window.location.hostname}/api/v1/content/{remoteData.id}
                        </Typography>
                    </Tooltip>
                </FormHelperText>
            </FormControl>
            <GlobalPermissionCheck
                permissions={[
                    GlobalPermissions.EditContent
                ]}
                discreet
            >
                <Divider
                    sx={{
                        mx: -2
                    }}
                />
                <CardActions
                    buttonFlex="0 1 120px"
                    sx={{
                        justifyContent: "end"
                    }}
                >
                    <Button
                        variant="outlined"
                        color="neutral"
                        disabled={Boolean(newData) == Boolean(remoteData.data)}
                        onClick={() => {
                            setNewData?.(remoteData.data || "");
                        }}
                    >
                        cancel
                    </Button>
                    <Button
                        type="submit"
                        disabled={Boolean(newData) == Boolean(remoteData.data)}
                        onClick={onSaveNewData}
                    >
                        save
                    </Button>
                </CardActions>
            </GlobalPermissionCheck>
        </Card>
    );
}
import { Box, Card, CardContent } from "@mui/joy";
import { PropsWithChildren } from "react";

export default function ({ children }: PropsWithChildren) {
    return <>
        <Box className="flex flex-col items-center justify-center w-11/12">

            <Card className="w-full max-w-lg  rounded-lg shadow-lg overflow-hidden bg-gradient-to-br ">
                <CardContent className="p-5" >
                    {children}
                </CardContent>
            </Card>
        </Box>
    </>
};
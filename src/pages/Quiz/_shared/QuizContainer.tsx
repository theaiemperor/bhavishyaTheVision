import { Box } from "@mui/joy";
import { PropsWithChildren } from "react";

export default function ({ children }: PropsWithChildren) {
    return <>
        <Box className="flex flex-col items-center justify-center w-11/12">

            <Box  className="w-full max-w-lg bg-white rounded-lg shadow-lg overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50">
                <Box className="p-6" >
                    {children}
                </Box>
            </Box>
        </Box>
    </>
};
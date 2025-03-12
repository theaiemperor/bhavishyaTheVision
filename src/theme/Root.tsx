import React from "react";
import { CssBaseline, CssVarsProvider, extendTheme } from "@mui/joy";

export default function Root({ children }) {

    const theme = extendTheme();


    return (
        <>
            <CssVarsProvider>
                <CssBaseline />
                {children}
            </CssVarsProvider>
        </>
    );
}
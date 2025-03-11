import Layout from "@theme/Layout";
import Main from "./Main";
import { Box } from "@mui/joy";

export default function () {
    return <>
        <Layout title="Quiz" description="Learn by Quiz">
            <Box sx={{ mt: 5 }}>
                <Main />
            </Box>
        </Layout>
    </>
};
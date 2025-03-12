import { ReactNode } from 'react';
import { Card, Typography, CardContent, useTheme } from "@mui/joy";
import GradientText from '@site/src/components/global/GradientText';



interface Props {
    title: ReactNode
    children: ReactNode
}

export default function (props: Props) {


    const theme = useTheme();



    return <>
        <Card
            className="p-1 shadow-sm duration-300 hover:-translate-y-1 hover:shadow-lg">
            <Typography
                color="primary"
                level="h4"
                sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                children={props.title}
            />
            <CardContent>
                {props.children}
            </CardContent>
        </Card>
    </>
};
import { ReactNode } from 'react';
import { Box, Divider, useTheme } from "@mui/joy";
import GradientText from './GradientText';


interface Props {
    className?: string
    title?: string
    children: ReactNode
}

export default function (props: Props) {


    const { palette } = useTheme();

    return <>
        <Box
            className={`p-3 md:p-5  ${props.className}`}>
            <Box className="flex justify-center">
                <span>
                    <GradientText className="text-3xl md:text-3xl text-center font-bold lg:text-4xl">
                    {props.title}
                    </GradientText>
                    <Divider
                        sx={{
                            width: '50%',
                            ml: '25%',
                            mt: 2.5,
                            height: 0.06,
                            background: `linear-gradient(to right, ${palette.primary[400]}, ${palette.danger[400]})`,
                            borderRadius: 10

                        }}

                    />
                </span>
            </Box>
            <Box className="mt-16">
                {props.children}
            </Box>
        </Box>
    </>
};
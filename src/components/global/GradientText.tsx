import { Box, BoxProps, useTheme } from "@mui/joy";
import { SxProps } from '@mui/joy/styles/types';


interface Props extends BoxProps {
    from?: string
    to?: string
    kind?: 'single' | 'multiple'
}

export default function ({ from, to, kind, ...props }: Props) {

    const { palette } = useTheme();

    const start = from || kind === 'single' ? palette.primary[600] : palette.danger[400];
    const end = to || kind === 'single' ? palette.primary[400]:palette.primary[600]

    const styles: SxProps = {
        background: `linear-gradient(to right, ${start }, ${end})`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    }

    return <Box {...{ ...props, sx: { ...styles, ...props.sx } }} />
};
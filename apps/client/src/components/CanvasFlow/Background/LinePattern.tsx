import { GRID_SIZE } from '@constants';
import { useTheme } from '@mui/material';

export default ({ points }: { points: string }) => {
    const theme = useTheme();
    return (
        <g>
            <pattern
                id="gridPatternMajor"
                x="0"
                y="0"
                width={GRID_SIZE}
                height={GRID_SIZE}
                patternUnits="userSpaceOnUse"
            >
                <path
                    d={`M 0 0 L ${GRID_SIZE} 0 ${GRID_SIZE} ${GRID_SIZE} 0 ${GRID_SIZE} z`}
                    stroke={theme.palette.lines.primary[theme.palette.mode]}
                    strokeWidth="1"
                    fill="none"
                ></path>
            </pattern>
            <polygon points={points} fill="url(#gridPatternMajor)"></polygon>
        </g>
    );
};

import { GRID_SIZE } from '@constants';
import { useTheme } from '@mui/material';

export default ({ points }: { points: string }) => {
    const theme = useTheme();
    const GRID_HALF_SIZE = GRID_SIZE / 2;
    return (
        <g>
            <pattern
                id="gridPatternMinor"
                x="0"
                y="0"
                width={GRID_SIZE}
                height={GRID_SIZE}
                patternUnits="userSpaceOnUse"
            >
                <path
                    d={`M 0 ${GRID_HALF_SIZE} L ${GRID_SIZE} ${GRID_HALF_SIZE}`}
                    stroke={theme.palette.lines.secondary[theme.palette.mode]}
                    strokeWidth="1"
                    strokeDasharray={4}
                ></path>
                <path
                    d={`M ${GRID_HALF_SIZE} 0 L ${GRID_HALF_SIZE} ${GRID_SIZE}`}
                    stroke={theme.palette.lines.secondary[theme.palette.mode]}
                    strokeWidth="1"
                    strokeDasharray={4}
                ></path>
            </pattern>
            <polygon points={points} fill="url(#gridPatternMinor)"></polygon>
        </g>
    );
};

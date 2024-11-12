import {
    GRID_3D_HEIGHT_SIZE,
    GRID_3D_WIDTH_SIZE,
    GRID_SIZE,
} from '@cloudflow/constants';
import { Dimension } from '@cloudflow/types';
import { useTheme } from '@mui/material';

type Props = {
    points: string;
    dimension: Dimension;
};

export default ({ points, dimension }: Props) => {
    const theme = useTheme();
    const d1 = dimension === '2d' ? `M 0 45 L 90 45` : `M 0 0 L 128 74`;
    const d2 = dimension === '2d' ? `M 45 0 L 45 90` : `M 0 74 L 128 0`;
    const y = dimension === '2d' ? 0 : 37;
    const width = dimension === '2d' ? GRID_SIZE : GRID_3D_WIDTH_SIZE;
    const height = dimension === '2d' ? GRID_SIZE : GRID_3D_HEIGHT_SIZE;

    return (
        <g>
            <pattern
                id="gridPatternMinor"
                x="0"
                y={y}
                width={width}
                height={height}
                patternUnits="userSpaceOnUse"
            >
                <path
                    d={d1}
                    stroke={theme.palette.lines.secondary[theme.palette.mode]}
                    strokeWidth="1"
                    strokeDasharray={4}
                ></path>
                <path
                    d={d2}
                    stroke={theme.palette.lines.secondary[theme.palette.mode]}
                    strokeWidth="1"
                    strokeDasharray={4}
                ></path>
            </pattern>
            <polygon points={points} fill="url(#gridPatternMinor)"></polygon>
        </g>
    );
};

import {
    GRID_3D_DEPTH_SIZE,
    GRID_3D_HEIGHT_SIZE,
    GRID_3D_WIDTH_SIZE,
    GRID_SIZE,
} from '@cloud-graph/constants';
import { Dimension } from '@cloud-graph/types';
import { useTheme } from '@mui/material';

type Props = {
    dimension: Dimension;
    points: string;
};
export default ({ points, dimension }: Props) => {
    const theme = useTheme();
    const d =
        dimension === '2d'
            ? `M 0 0 L 90 0 90 90 0 90 z`
            : `M 64 0 L 128 37 64 74 0 37 z`; //TODO: 상수화
    const y = dimension === '2d' ? 0 : GRID_3D_DEPTH_SIZE;
    const width = dimension === '2d' ? GRID_SIZE : GRID_3D_WIDTH_SIZE;
    const height = dimension === '2d' ? GRID_SIZE : GRID_3D_HEIGHT_SIZE;

    return (
        <g>
            <pattern
                id="gridPatternMajor"
                width={width}
                height={height}
                x="0"
                y={y}
                patternUnits="userSpaceOnUse"
            >
                <path
                    d={d}
                    stroke={theme.palette.lines.primary[theme.palette.mode]}
                    strokeWidth="1"
                    fill="none"
                ></path>
            </pattern>

            <polygon points={points} fill="url(#gridPatternMajor)"></polygon>
        </g>
    );
};

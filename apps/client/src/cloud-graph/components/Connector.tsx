import { useTheme } from '@mui/material';
import { Point } from '@cloud-graph/types';

type Props = {
    from: Point;
    to: Point;
};
export default ({ from, to }: Props) => {
    const theme = useTheme();
    const color =
        theme.palette.mode === 'dark'
            ? theme.palette.grey[200]
            : theme.palette.grey[800];

    const linePathD = `M ${from.x} ${from.y} L ${to.x} ${to.y}`;

    return (
        <g>
            <defs>
                <marker
                    id="arrowhead"
                    markerWidth="5"
                    markerHeight="5"
                    refX="5"
                    refY="2.5"
                    orient="auto"
                >
                    <path d="M 0 0 L 5 2.5 L 0 5 Z" fill={color} />
                </marker>
            </defs>
            <path
                d={linePathD}
                stroke={color}
                fill="none"
                strokeWidth={2}
                markerEnd="url(#arrowhead)"
            />
        </g>
    );
};

import { useTheme } from '@mui/material';
import { ComponentProps } from 'react';

interface EdgeProps extends ComponentProps<'line'> {
    x1: number;
    x2: number;
    y1: number;
    y2: number;
    isConnecting?: boolean;
}

export default ({ x1, x2, y1, y2, isConnecting }: EdgeProps) => {
    const theme = useTheme();
    const color =
        theme.palette.mode === 'dark'
            ? theme.palette.grey[200]
            : theme.palette.grey[800];
    const linePathD = `M ${x1} ${y1} L ${x2} ${y2}`;

    return (
        <svg>
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
                stroke="black"
                fill="none"
                strokeWidth={2}
                style={{
                    transition: isConnecting
                        ? undefined
                        : `d ${theme.custom.animation.move}`,
                }}
                markerEnd="url(#arrowhead)"
            />
        </svg>
    );
};

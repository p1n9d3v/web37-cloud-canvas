import useConnection from '@cloudflow/hooks/useConnection';
import { useTheme } from '@mui/material';
import { AnchorType } from '@types';
import { MouseEvent } from 'react';

type Props = {
    nodeId: string;
    type: AnchorType;
    cx?: number;
    cy?: number;
};

export default ({ nodeId, type, cx, cy }: Props) => {
    const { startConnecting } = useConnection();
    const theme = useTheme();
    const color =
        theme.palette.mode === 'dark'
            ? theme.palette.grey[200]
            : theme.palette.grey[800];

    const handleMouseDown = (e: MouseEvent<SVGCircleElement>) => {
        e.stopPropagation();

        const { currentTarget } = e;
        const anchorRect = currentTarget.getBoundingClientRect();
        const anchorCenterX = anchorRect.left + anchorRect.width / 2;
        const anchorCenterY = anchorRect.top + anchorRect.height / 2;

        startConnecting({
            nodeId,
            type,
            point: { x: anchorCenterX, y: anchorCenterY },
        });
    };

    return (
        <circle
            r={5}
            fill={color}
            cx={cx}
            cy={cy}
            onMouseDown={handleMouseDown}
        />
    );
};

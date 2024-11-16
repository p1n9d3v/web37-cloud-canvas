import { ANCHOR_RADIUS } from '@cloudflow/constants';
import { MouseEvent } from 'react';

type Props = {
    visible: boolean;
    cx?: number;
    cy?: number;
    onStartConnect?: () => void;
};

export default ({ cx, cy, visible, onStartConnect }: Props) => {
    const handleMouseDown = (e: MouseEvent) => {
        e.stopPropagation();
        onStartConnect && onStartConnect();
    };

    return (
        <circle
            r={ANCHOR_RADIUS}
            cx={cx}
            cy={cy}
            fill="black"
            style={{
                visibility: visible ? 'visible' : 'hidden',
            }}
            onMouseDown={handleMouseDown}
        />
    );
};

import ConnectionPointer from '@components/CanvasFlow/Node/ConnectionPointer';
import { GRID_SIZE_HALF, GRID_SIZE } from '@constants';
import { useTheme } from '@mui/material';
import { MouseEvent } from 'react';

type OutlineProps = {
    isSelected: boolean;
    onMouseDownAnchor: (e: MouseEvent) => void;
};

export default ({ isSelected, onMouseDownAnchor }: OutlineProps) => {
    const theme = useTheme();

    return (
        <g>
            <rect
                width={GRID_SIZE}
                height={GRID_SIZE}
                fill="transparent"
                strokeWidth="3"
                strokeDasharray={isSelected ? '10, 5' : '0'}
                strokeDashoffset={0}
                stroke={theme.palette.primary.main}
            >
                {isSelected && (
                    <animate
                        attributeName="stroke-dashoffset"
                        from="0"
                        to="15"
                        dur="0.5s"
                        repeatCount="indefinite"
                    />
                )}
            </rect>

            {isSelected && (
                <>
                    {/* Top */}
                    <ConnectionPointer
                        cx={GRID_SIZE_HALF}
                        onMouseDown={onMouseDownAnchor}
                    />
                    {/* Right */}
                    <ConnectionPointer
                        cx={GRID_SIZE}
                        cy={GRID_SIZE_HALF}
                        onMouseDown={onMouseDownAnchor}
                    />
                    {/* Bottom */}
                    <ConnectionPointer
                        cx={GRID_SIZE_HALF}
                        cy={GRID_SIZE}
                        onMouseDown={onMouseDownAnchor}
                    />
                    {/* Left */}
                    <ConnectionPointer
                        cy={GRID_SIZE_HALF}
                        onMouseDown={onMouseDownAnchor}
                    />
                </>
            )}
        </g>
    );
};

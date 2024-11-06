import ConnectionPointer from '@components/CanvasFlow/Node/ConnectionPointer';
import { GRID_HALF, GRID_SIZE } from '@constants';
import { useTheme } from '@mui/material';

type OutlineProps = {
    isSelected: boolean;
};

const ConnectionPointers = () => (
    <>
        {/* Top */}
        <ConnectionPointer cx={GRID_HALF} />
        {/* Right */}
        <ConnectionPointer cx={GRID_SIZE} cy={GRID_HALF} />
        {/* Bottom */}
        <ConnectionPointer cx={GRID_HALF} cy={GRID_SIZE} />
        {/* Left */}
        <ConnectionPointer cy={GRID_HALF} />
    </>
);

export default ({ isSelected }: OutlineProps) => {
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

            {isSelected && <ConnectionPointers />}
        </g>
    );
};

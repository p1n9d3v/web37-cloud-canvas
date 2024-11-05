import LoadingSpinnerNode from '@components/CanvasFlow/Node/LoadingSpinnerNode';
import { GRID_SIZE } from '@constants';
import { useTheme } from '@mui/material';
import useNodeMovement from '@hooks/useNodeMovement';
import {
    ComponentProps,
    lazy,
    Suspense,
    useMemo,
    MouseEvent as ReactMouseEvent,
    useState,
} from 'react';
import ConnectionPointer from '@components/CanvasFlow/Node/ConnectionPointer';

// Lazy load the server node component
const ServerNode = lazy(() => import('./ServerNode'));

interface Node extends ComponentProps<'g'> {
    id: string;
    position: {
        x: number;
        y: number;
    };
    type: string;
}

export default ({ id, type, position: { x, y }, ...props }: Node) => {
    const theme = useTheme();
    const { handleMoveStart: handleNodeMoveStart } = useNodeMovement();
    const [isSelecting, setIsSelecting] = useState(false);

    const renderedNode = useMemo(() => {
        let NodeComponent = null;
        switch (type) {
            case 'server':
                NodeComponent = (
                    <ServerNode width={GRID_SIZE} height={GRID_SIZE} />
                );
                break;
        }
        return (
            <Suspense
                fallback={
                    <LoadingSpinnerNode width={GRID_SIZE} height={GRID_SIZE} />
                }
            >
                {NodeComponent}
            </Suspense>
        );
    }, [type]);

    const handleMouseDown = (e: ReactMouseEvent) => {
        handleNodeMoveStart(e, id);
    };

    const handleDbClick = () => {
        setIsSelecting((prev) => !prev);
    };

    return (
        <g
            style={{
                transform: `translate(${x}px, ${y}px)`,
                transition: 'all 0.1s linear',
            }}
            id={id}
            onMouseDown={handleMouseDown}
            onDoubleClick={handleDbClick}
            {...props}
        >
            <svg
                width={GRID_SIZE}
                height={GRID_SIZE}
                viewBox={`-10 -10 ${GRID_SIZE + 20} ${GRID_SIZE + 20}`}
            >
                {renderedNode}
                {isSelecting && (
                    <>
                        <rect
                            width={GRID_SIZE}
                            height={GRID_SIZE}
                            fill="transparent"
                            strokeWidth="3"
                            strokeDasharray="10, 5"
                            strokeDashoffset={0}
                            stroke={theme.palette.primary.main}
                        >
                            <animate
                                attributeName="stroke-dashoffset"
                                from="0"
                                to="15"
                                dur="0.5s"
                                repeatCount="indefinite"
                            />
                        </rect>

                        {/* Top */}
                        <ConnectionPointer cx={GRID_SIZE / 2} />
                        {/* Right */}
                        <ConnectionPointer cx={GRID_SIZE} cy={GRID_SIZE / 2} />
                        {/* Bottom */}
                        <ConnectionPointer cx={GRID_SIZE / 2} cy={GRID_SIZE} />
                        {/* Left */}
                        <ConnectionPointer cy={GRID_SIZE / 2} />
                    </>
                )}
            </svg>
        </g>
    );
};

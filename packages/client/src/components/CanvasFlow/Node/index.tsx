import LoadingSpinnerNode from '@components/CanvasFlow/Node/LoadingSpinnerNode';
import { GRID_SIZE } from '@constants';
import useNodeMovement from '@hooks/useNodeMovement';
import { ComponentProps, lazy, Suspense, useMemo } from 'react';

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
    const { handleMoveStart: handleNodeMoveStart } = useNodeMovement();

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

    return (
        <g
            style={{
                transform: `translate(${x}px, ${y}px)`,
                transition: 'all 0.1s linear',
            }}
            id={id}
            onMouseDown={(e) => handleNodeMoveStart(e, id)}
            {...props}
        >
            <svg width={GRID_SIZE} height={GRID_SIZE}>
                {renderedNode}
                <rect
                    width={GRID_SIZE}
                    height={GRID_SIZE}
                    fill="transparent"
                    stroke="red"
                />
            </svg>
        </g>
    );
};

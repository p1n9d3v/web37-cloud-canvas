import LoadingSpinnerNode from '@components/CanvasFlow/Node/LoadingSpinnerNode';
import Outline from '@components/CanvasFlow/Node/Outline';
import { GRID_SIZE, POINTER_SIZE } from '@constants';
import useNodeMovement from '@hooks/useNode';
import { Node } from '@types';
import { lazy, MouseEvent as ReactMouseEvent, Suspense, useMemo } from 'react';

// Lazy load the server node component
const ServerNode = lazy(() => import('./ServerNode'));

export default ({ id, type, isFocused, position: { x, y } }: Node) => {
    const { ref: nodeRef, initiateNodeDrag, selectNode } = useNodeMovement();

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

    const handleMouseDown = (e: ReactMouseEvent) => initiateNodeDrag(e, id);
    const handleDbClick = () => selectNode(id);

    return (
        <g
            ref={nodeRef}
            style={{
                transform: `translate(${x}px, ${y}px)`,
                transition: 'all 0.2s linear',
            }}
            id={id}
            onMouseDown={handleMouseDown}
            onDoubleClick={handleDbClick}
        >
            <svg
                width={GRID_SIZE}
                height={GRID_SIZE}
                viewBox={`-${POINTER_SIZE} -${POINTER_SIZE} ${GRID_SIZE + 10} ${
                    GRID_SIZE + 10
                }`}
            >
                {renderedNode}
                <Outline isSelected={isFocused} />
            </svg>
        </g>
    );
};

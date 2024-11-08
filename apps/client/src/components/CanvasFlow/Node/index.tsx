import Outline from '@components/CanvasFlow/Node/Outline';
import { GRID_SIZE, POINTER_SIZE } from '@constants';
import useEdge from '@hooks/useEdge';
import useNode from '@hooks/useNode';
import { Node } from '@types';
import { lazy, MouseEvent as ReactMouseEvent, Suspense, useMemo } from 'react';

// Lazy load the server node component
const ServerNode = lazy(() => import('./ServerNode'));

export default ({ id, type, isFocused, position: { x, y } }: Node) => {
    const { ref: nodeRef, initiateNodeDrag, selectNode } = useNode();
    const { startConnecting } = useEdge();

    const renderedNode = useMemo(() => {
        let NodeComponent = null;
        switch (type) {
            case 'server':
                NodeComponent = (
                    <ServerNode width={GRID_SIZE} height={GRID_SIZE} />
                );
                break;
        }
        return <Suspense>{NodeComponent}</Suspense>;
    }, [type]);

    const handleMouseDownNode = (e: ReactMouseEvent) => initiateNodeDrag(e, id);
    const handleDbClick = () => selectNode(id);
    const handleMouseDownAnchor = (e: ReactMouseEvent) => startConnecting(e);

    return (
        <g
            ref={nodeRef}
            style={{
                transform: `translate(${x}px, ${y}px)`,
                // transition: `all ${theme.custom.animation.move}`,
            }}
            id={id}
            onMouseDown={handleMouseDownNode}
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
                <Outline
                    isSelected={isFocused}
                    onMouseDownAnchor={handleMouseDownAnchor}
                />
            </svg>
        </g>
    );
};

import RegionGroup from '@components/Group/ncloud/RegionGroup';
import { useCanvasDimensionContext } from '@contexts/CanvasDimensionContext';
import { useCanvasInstanceContext } from '@contexts/CanvasInstanceContext/index';
import useDrag from '@hooks/useDrag';
import { Group } from '@types';
import { useEffect } from 'react';

const GroupFacctory = (group: Group) => {
    switch (group.type) {
        case 'region':
            return <RegionGroup {...group} />;
    }
};

type Props = {
    group: Group;
};

export default ({ group }: Props) => {
    const { id, bounds, type } = group;
    const { dimension } = useCanvasDimensionContext();
    const { dispatch } = useCanvasInstanceContext();
    const { isDragging, startDrag, moveDrag, stopDrag } = useDrag({
        initialPoint: { x: bounds.x, y: bounds.y },
        updateFn: (point) =>
            dispatch({
                type: 'MOVE_GROUP',
                payload: {
                    id,
                    point,
                    dimension,
                },
            }),
    });

    const handleMouseDown = (e: React.MouseEvent) => {
        e.stopPropagation();
        const { clientX, clientY } = e;
        startDrag({ x: clientX, y: clientY });
        document.body.style.cursor = 'move';
    };

    const handleMouseMove = (moveEvent: MouseEvent) => {
        moveDrag({ x: moveEvent.clientX, y: moveEvent.clientY });
    };

    const handleMouseUp = () => {
        stopDrag();
        document.body.style.cursor = 'default';
    };

    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);

    return (
        <g
            id={id}
            transform={`translate(${bounds.x} ${bounds.y})`}
            onMouseDown={handleMouseDown}
        >
            {GroupFacctory(group)}
        </g>
    );
};

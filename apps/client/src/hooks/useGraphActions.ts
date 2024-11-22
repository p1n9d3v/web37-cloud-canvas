import { NcloudFactory } from '@/src/models/nocloud';
import { useDimensionContext } from '@contexts/DimensionContext';
import { useEdgeContext } from '@contexts/EdgeContext';
import { useGroupContext } from '@contexts/GroupContext';
import { useNodeContext } from '@contexts/NodeContext';
import { useSvgContext } from '@contexts/SvgContext';
import { Node, Point } from '@types';
import { getSvgPoint } from '@utils';
import { alignNodePoint } from '@helpers/node';
import { nanoid } from 'nanoid';

export default () => {
    const {
        state: { nodes },
        dispatch: nodeDispatch,
    } = useNodeContext();
    const { state: edgeState, dispatch: edgeDispatch } = useEdgeContext();
    const { state: groupState, dispatch: groupDispatch } = useGroupContext();
    const { dimension } = useDimensionContext();
    const { svgRef } = useSvgContext();

    const addNode = (type: Node['type']) => {
        const node = NcloudFactory(type);
        node.id = `node-${nanoid()}`;
        //TODO: Focus 된 그룹에 추가하도록 수정해야함
        node.point = { x: 0, y: 0 };
        nodeDispatch({ type: 'ADD_NODE', payload: node });
    };

    const dragNode = (id: string, point: Point) => {
        if (!svgRef.current) return;
        const node = nodes[id];
        nodeDispatch({
            type: 'DRAG_NODE',
            payload: { id, point: alignNodePoint(node, point, dimension) },
        });
    };

    return {
        addNode,
        dragNode,
    };
};

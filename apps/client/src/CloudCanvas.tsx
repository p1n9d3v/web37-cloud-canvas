import Graph from '@components/Graph';
import GridBackground from '@components/GridBackground';
import Group from '@components/Group';
import Node from '@components/Node';
import { useCanvasDimensionContext } from '@contexts/CanvasDimensionContext';
import { useCanvasInstanceContext } from '@contexts/CanvasInstanceContext';

export default () => {
    const { dimension } = useCanvasDimensionContext();
    const {
        state: { nodes, groups },
        dispatch,
    } = useCanvasInstanceContext();

    return (
        <Graph>
            <GridBackground />
            {Object.values(groups).map((group) => (
                <Group group={group} />
            ))}
            {Object.values(nodes).map((node) => (
                <Node node={node} />
            ))}
        </Graph>
    );
};

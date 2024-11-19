import Graph from '@components/Graph';
import GridBackground from '@components/GridBackground';
import Group from '@components/Group';
import Node from '@components/Node';
import { useCanvasInstanceContext } from '@contexts/CanvasInstanceContext';

export default () => {
    const {
        state: { nodes, groups },
    } = useCanvasInstanceContext();
    return (
        <Graph>
            <GridBackground />
            {Object.values(nodes).map((node) => (
                <Node id={node.id} type={node.type} point={node.point} />
            ))}
            {Object.values(groups).map((group) => (
                <Group group={group} />
            ))}
        </Graph>
    );
};

import Connection from '@components/Connection';
import Connectors from '@components/Connectors/index';
import Edge from '@components/Edge';
import Graph from '@components/Graph';
import GridBackground from '@components/GridBackground';
import Group from '@components/Group';
import Node from '@components/Node';
import { useCanvasDimensionContext } from '@contexts/CanvasDimensionContext';
import { useCanvasInstanceContext } from '@contexts/CanvasInstanceContext';

export default () => {
    const { dimension } = useCanvasDimensionContext();
    const {
        state: { nodes, edges, groups, connection },
        dispatch,
    } = useCanvasInstanceContext();

    console.log(groups);
    console.log(nodes);
    console.log(edges);

    return (
        <Graph>
            <GridBackground />
            {Object.values(groups).map((group) => (
                <Group group={group} />
            ))}
            {Object.values(nodes).map((node) => (
                <>
                    <Node node={node} />
                    <Connectors node={node} />
                </>
            ))}
            {connection && (
                <Connection from={connection.from} to={connection.to} />
            )}

            {edges &&
                Object.values(edges).map((edge) => (
                    <Edge key={edge.id} edge={edge} isSelected={true} />
                ))}
        </Graph>
    );
};

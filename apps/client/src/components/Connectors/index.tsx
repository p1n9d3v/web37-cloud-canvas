import Connector from '@components/Connectors/Connector';
import { useCanvasDimensionContext } from '@contexts/CanvasDimensionContext';
import { ConnectorType, Node } from '@types';
import { getConnectorPoints } from '@utils';

type Props = {
    node: Node;
    // edges: Edge[];
    // dimension: Dimension;
    // isSelected: boolean;
};

export default ({ node }: Props) => {
    const { dimension } = useCanvasDimensionContext();
    const connectors = getConnectorPoints(node, dimension);

    // const connectedAnchors = edges
    //     .filter((edge) => edge.source.node.id === node.id)
    //     .map((edge) => edge.source.anchorType);

    return (
        <>
            {connectors &&
                Object.entries(connectors).map(([type, point]) => (
                    <Connector
                        type={type as ConnectorType}
                        node={node}
                        key={`${node.id}-${type}`}
                        cx={point.x}
                        cy={point.y}
                        visible={true}
                    />
                ))}
        </>
    );
};

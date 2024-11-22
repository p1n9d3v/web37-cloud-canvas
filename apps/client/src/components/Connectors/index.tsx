import Connector from '@components/Connectors/Connector';
import { useDimensionContext } from '@contexts/DimensionContext';
import { ConnectorType, Node } from '@types';
import { getConnectorPoints } from '@utils';

type Props = {
    node: Node;
    // edges: Edge[];
    // dimension: Dimension;
    // isSelected: boolean;
};

export default ({ node }: Props) => {
    const { dimension } = useDimensionContext();
    const connectors = getConnectorPoints(node, dimension);

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

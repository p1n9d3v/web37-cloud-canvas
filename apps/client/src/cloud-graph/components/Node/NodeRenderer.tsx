import CloudFunctionNode from '@cloud-graph/components/Node/ncloud/CloudFunctionNode';
import DBMySQLNode from '@cloud-graph/components/Node/ncloud/DBMySQLNode';
import ObjectStorageNode from '@cloud-graph/components/Node/ncloud/ObjectStorageNode';
import ServerNode from '@cloud-graph/components/Node/ncloud/ServerNode';
import { Dimension, Node } from '@cloud-graph/types';

type Props = {
    node: Node;
    dimension: Dimension;
    isSelected: boolean;
};

const nodeFactory = (node: Node, dimension: Dimension) => {
    switch (node.type) {
        case 'server':
            return <ServerNode label={node.label} dimension={dimension} />;
        case 'cloud-function':
            return <CloudFunctionNode dimension={dimension} />;
        case 'object-storage':
            return <ObjectStorageNode dimension={dimension} />;
        case 'db-mysql':
            return <DBMySQLNode dimension={dimension} />;
        default:
            null;
    }
};

const NodeRenderer = ({ node, dimension, isSelected }: Props) => {
    return (
        <>
            {nodeFactory(node, dimension)}
            {dimension === '2d' && (
                <svg width="90" height="90">
                    <rect
                        height="90"
                        width="90"
                        style={{
                            strokeWidth: 4,
                            stroke: 'rgb(66, 134, 197)',
                            fill: 'none',
                            visibility: isSelected ? 'visible' : 'hidden',
                        }}
                    ></rect>
                </svg>
            )}
        </>
    );
};

export default NodeRenderer;

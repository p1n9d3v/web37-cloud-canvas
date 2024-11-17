import CloudFunctionNode from '@cloud-graph/components/Node/ncloud/CloudFunctionNode';
import DBMySQLNode from '@cloud-graph/components/Node/ncloud/DBMySQLNode';
import ObjectStorageNode from '@cloud-graph/components/Node/ncloud/ObjectStorageNode';
import ServerNode from '@cloud-graph/components/Node/ncloud/ServerNode';
import Selected2DBox from '@cloud-graph/components/Node/Selected2DBox';
import PointerNode from '@cloud-graph/components/Node/utility/PointerNode';
import { Dimension, Node } from '@cloud-graph/types';
import { isCloudNode } from '@cloud-graph/utils';

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
        case 'pointer':
            return <PointerNode />;
        default:
            null;
    }
};

const NodeRenderer = ({ node, dimension, isSelected }: Props) => {
    return (
        <>
            {nodeFactory(node, dimension)}
            {dimension === '2d' && isCloudNode(node) && (
                <Selected2DBox isSelected={isSelected} />
            )}
        </>
    );
};

export default NodeRenderer;

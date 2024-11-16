import CloudFunctionNode from '@cloud-graph/components/Node/ncloud/CloudFunctionNode';
import DBMySQLNode from '@cloud-graph/components/Node/ncloud/DBMySQLNode';
import ObjectStorageNode from '@cloud-graph/components/Node/ncloud/ObjectStorageNode';
import ServerNode from '@cloud-graph/components/Node/ncloud/ServerNode';
import { Node } from '@cloud-graph/types';

type Props = {
    node: Node;
};

const nodeFactory = (node: Node) => {
    switch (node.type) {
        case 'server':
            return <ServerNode node={node} />;
        case 'cloud-function':
            return <CloudFunctionNode node={node} />;
        case 'object-storage':
            return <ObjectStorageNode node={node} />;
        case 'db-mysql':
            return <DBMySQLNode node={node} />;

        default:
            null;
    }
};

const NodeRenderer = ({ node }: Props) => {
    return <>{nodeFactory(node)}</>;
};

export default NodeRenderer;

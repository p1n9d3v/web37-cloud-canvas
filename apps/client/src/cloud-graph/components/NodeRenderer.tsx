import ServerNode from '@cloud-graph/components/Node/ServerNode';
import { Node } from '@cloud-graph/types';

type Props = {
    node: Node;
};

const nodeFactory = (node: Node) => {
    switch (node.type) {
        case 'server':
            return <ServerNode node={node} />;
        default:
            null;
    }
};

const NodeRenderer = ({ node }: Props) => {
    return <>{nodeFactory(node)}</>;
};

export default NodeRenderer;

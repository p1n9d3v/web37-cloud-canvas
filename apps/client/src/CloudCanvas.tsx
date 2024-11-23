import Connection from '@components/Connection';
import Connectors from '@components/Connectors';
import Edge from '@components/Edge';
import Graph from '@components/Graph';
import GridBackground from '@components/GridBackground';
import Node from '@components/Node';
import { useEdgeContext } from '@contexts/EdgeContext';
import { useNodeContext } from '@contexts/NodeContext';
import useConnection from '@hooks/useConnection';
import useGraphActions from '@hooks/useGraphActions';
import { useEffect } from 'react';

export default () => {
    const {
        state: { nodes },
    } = useNodeContext();
    const {
        state: { edges },
    } = useEdgeContext();

    const { moveNode, addEdge } = useGraphActions();

    const {
        connection,
        isConnecting,
        openConnection,
        connectConnection,
        closeConnection,
    } = useConnection({
        updateEdgeFn: addEdge,
    });

    useEffect(() => {
        const handleContextMenu = (event: MouseEvent) => event.preventDefault();
        document.addEventListener('contextmenu', handleContextMenu);

        return () => {
            document.removeEventListener('contextmenu', handleContextMenu);
        };
    }, []);

    return (
        <Graph>
            <GridBackground />
            {/* {Object.values(groups).map((group) => ( */}
            {/*     <Group group={group} /> */}
            {/* ))} */}
            {Object.values(nodes).map((node) => (
                <>
                    <Node node={node} onMove={moveNode} />
                    <Connectors
                        node={node}
                        isConnecting={isConnecting}
                        onOpenConnection={openConnection}
                        onConnectConnection={connectConnection}
                        onCloseConnection={closeConnection}
                    />
                </>
            ))}
            {connection && (
                <Connection
                    source={connection.source}
                    target={connection.target}
                />
            )}

            {edges &&
                Object.values(edges).map((edge) => (
                    <Edge
                        key={edge.id}
                        edge={edge}
                        isSelected={false}
                        sourceConnector={
                            nodes[edge.source.id].connectors[
                                edge.source.connectorType
                            ]
                        }
                        targetConnector={
                            nodes[edge.target.id].connectors[
                                edge.target.connectorType
                            ]
                        }
                    />
                ))}
        </Graph>
    );
};

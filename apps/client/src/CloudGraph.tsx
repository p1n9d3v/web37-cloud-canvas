import BendingPointer from '@components/BendingPointer';
import Connection from '@components/Connection';
import Connectors from '@components/Connectors';
import Edge from '@components/Edge';
import Graph from '@components/Graph';
import GridBackground from '@components/GridBackground';
import Group from '@components/Group';
import Node from '@components/Node';
import { useEdgeContext } from '@contexts/EdgeContext';
import { useGroupContext } from '@contexts/GroupContext';
import { useNodeContext } from '@contexts/NodeContext';
import { useSelectionContext } from '@contexts/SelectionContext';
import { useSvgContext } from '@contexts/SvgContext';
import useConnection from '@hooks/useConnection';
import useGraphActions from '@hooks/useGraphActions';
import { useEffect } from 'react';

export default () => {
    const { svgRef } = useSvgContext();
    const {
        state: { nodes },
    } = useNodeContext();
    const {
        state: { edges },
    } = useEdgeContext();
    const {
        state: { groups },
    } = useGroupContext();

    const {
        moveNode,
        addEdge,
        splitEdge,
        moveBendingPointer,
        getGroupBounds,
        moveGroup,
    } = useGraphActions();

    const { selectedId, select, clearSelect } = useSelectionContext();

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
        const handleMouseDown = () => clearSelect();
        document.addEventListener('contextmenu', handleContextMenu);
        svgRef.current?.addEventListener('mousedown', handleMouseDown);

        return () => {
            document.removeEventListener('contextmenu', handleContextMenu);
            svgRef.current?.removeEventListener('mousedown', handleMouseDown);
        };
    }, []);

    console.log(groups);
    return (
        <Graph>
            <GridBackground />
            {Object.values(groups).map((group) => (
                <Group
                    group={group}
                    bounds={getGroupBounds(group.id)}
                    onMove={moveGroup}
                />
            ))}
            {Object.values(nodes).map((node) => (
                <>
                    <Node node={node} onMove={moveNode} onSelect={select} />
                    <Connectors
                        node={node}
                        isSelected={selectedId === node.id}
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
                    <>
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
                            onSplit={splitEdge}
                        />
                        {edge.bendingPoints.map((point, index) => (
                            <BendingPointer
                                key={`${edge.id}-${index}`}
                                edgeId={edge.id}
                                point={point}
                                index={index}
                                onMove={(newPoint) =>
                                    moveBendingPointer(edge.id, index, newPoint)
                                }
                            />
                        ))}
                    </>
                ))}
        </Graph>
    );
};

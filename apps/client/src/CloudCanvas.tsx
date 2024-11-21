import Connection from '@components/Connection';
import Connectors from '@components/Connectors/index';
import Edge from '@components/Edge';
import Graph from '@components/Graph';
import GridBackground from '@components/GridBackground';
import Group from '@components/Group';
import Node from '@components/Node';
import Pointer from '@components/Pointer';
import { useCanvasDimensionContext } from '@contexts/CanvasDimensionContext';
import { useCanvasInstanceContext } from '@contexts/CanvasInstanceContext';
import { useEffect } from 'react';

export default () => {
    const { dimension } = useCanvasDimensionContext();
    const {
        state: { nodes, edges, groups, connection },
        dispatch,
    } = useCanvasInstanceContext();

    //INFO: ctrl + 왼쪽 마우스 클릭시 컨텍스트 메뉴 뜨는거 방지
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
                    <>
                        <Edge key={edge.id} edge={edge} isSelected={true} />
                        {/* {edge.bendPoints.map((bendPoint) => ( */}
                        {/*     <Pointer point={bendPoint} /> */}
                        {/* ))} */}
                    </>
                ))}
        </Graph>
    );
};

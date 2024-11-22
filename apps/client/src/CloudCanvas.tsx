import Graph from '@components/Graph';
import GridBackground from '@components/GridBackground';
import { useCanvasDimensionContext } from '@contexts/CanvasDimensionContext';
import { useCanvasInstanceContext } from '@contexts/CanvasInstanceContext';
import useGlobal from '@hooks/useGlobal';
import { useEffect } from 'react';

export default () => {
    const { dimension } = useCanvasDimensionContext();
    const {
        state: { nodes, edges, groups, connection },
        dispatch,
    } = useCanvasInstanceContext();

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
            {/* {Object.values(nodes).map((node) => ( */}
            {/*     <> */}
            {/*         <Node node={node} /> */}
            {/*         <Connectors node={node} /> */}
            {/*     </> */}
            {/* ))} */}
            {/* {connection && ( */}
            {/*     <Connection from={connection.from} to={connection.to} /> */}
            {/* )} */}
            {/**/}
            {/* {edges && */}
            {/*     Object.values(edges).map((edge) => ( */}
            {/*         <Edge key={edge.id} edge={edge} isSelected={true} /> */}
            {/*     ))} */}
        </Graph>
    );
};

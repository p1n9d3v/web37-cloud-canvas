import {
    NcloudGroupFactory,
    NcloudNodeFactory,
    Regions,
} from '@/src/models/ncloud';
import { useGroupContext } from '@contexts/GroupContext';
import { useNodeContext } from '@contexts/NodeContext';
import { useSvgContext } from '@contexts/SvgContext';
import { getInitPoint } from '@helpers/cloud';
import useGraph from '@hooks/useGraph';
import useSelection from '@hooks/useSelection';
import { Region } from '@types';
import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';

export default () => {
    const { svgRef } = useSvgContext();
    const [region, setRegion] = useState<Region>('kr');
    const { addNode, addGroup, isExistGroup, addNodeToGroup } = useGraph();

    const addCloud = (type: string) => {
        if (!svgRef.current) return;

        const node = NcloudNodeFactory(type);
        const id = `node-${nanoid()}`;

        addNode({
            ...node,
            id,
            properties: {
                ...node.properties,
                region,
            },
            point: getInitPoint(svgRef.current!),
        });

        if (isExistGroup(region)) {
            addNodeToGroup(region, id);
        } else {
            const group = NcloudGroupFactory('region');
            addGroup({
                ...group,
                id: region,
                name: Regions[region].toUpperCase(),
                nodeIds: [id],
            });
        }
    };
    const addRegion = () => {};

    return {
        addCloud,
        addRegion,
    };
};

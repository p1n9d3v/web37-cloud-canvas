import {
    NcloudGroupFactory,
    NcloudNodeFactory,
    Regions,
} from '@/src/models/ncloud';
import { useNCloudContext } from '@contexts/NCloudContext';
import { getInitPoint } from '@helpers/cloud';
import useGraph from '@hooks/useGraph';
import useSelection from '@hooks/useSelection';
import { Region } from '@types';
import { nanoid } from 'nanoid';
import { useEffect } from 'react';

export default () => {
    const { selectedNodeId, selectedGroupId } = useSelection();
    const { region, setRegion } = useNCloudContext();

    const {
        nodes,
        groups,
        svgRef,
        updateNode,
        removeNodeFromGroup,
        addNode,
        addGroup,
        isExistGroup,
        addNodeToGroup,
    } = useGraph();

    useEffect(() => {
        if (selectedNodeId) {
            const node = nodes[selectedNodeId];
            setRegion(node.properties.region);
        }
    }, [selectedNodeId]);

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
            groupIds: [region],
            point: getInitPoint(svgRef.current!),
        });

        if (isExistGroup(region)) {
            addNodeToGroup(region, id);
        } else {
            addRegion(id, region);
        }
    };

    const addRegion = (id: string, region: string) => {
        const group = NcloudGroupFactory('region');
        addGroup({
            ...group,
            id: region,
            name: Regions[region].toUpperCase(),
            nodeIds: [],
        });
        addNodeToGroup(region, id);
    };

    const changeRegion = (newRegion: Region) => {
        setRegion(newRegion);
        if (selectedNodeId) {
            if (isExistGroup(newRegion)) {
                removeNodeFromGroup(region, selectedNodeId);
                addNodeToGroup(newRegion, selectedNodeId);
            } else {
                removeNodeFromGroup(region, selectedNodeId);
                addRegion(selectedNodeId, newRegion);
            }
            //INFO: 추후 Cloud와 그래프랑 분리 예정이라 따로 처리
            updateProperties(selectedNodeId, {
                region: newRegion,
            });
        }
    };

    const updateProperties = (id: string, properties: any) => {
        updateNode(id, { ...nodes[id].properties, ...properties });
    };

    const addVPC = (id: string) => {};

    const addSubnet = (id: string) => {};

    return {
        region,
        addCloud,
        addRegion,
        changeRegion,
    };
};

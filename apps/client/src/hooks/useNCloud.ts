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
import { useEffect, useState } from 'react';

export default () => {
    const { selectedNodeId, selectedGroupId } = useSelection();
    const { region, vpc, vpcList, setRegion, setVPC } = useNCloudContext();
    const [openCloudAppbar, setOpenCloudAppbar] = useState(false);

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
            setOpenCloudAppbar(true);
        } else {
            setOpenCloudAppbar(false);
        }
    }, [selectedNodeId]);

    const addResource = (type: string) => {
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
            groupIds: [],
            point: getInitPoint(svgRef.current!),
        });

        if (!isExistGroup(region)) {
            addRegion(region);
        }
        addNodeToGroup(region, id);
    };

    const addRegion = (region: string) => {
        const group = NcloudGroupFactory('region');
        addGroup({
            ...group,
            id: region,
            name: Regions[region].toUpperCase(),
            nodeIds: [],
        });
    };

    const changeRegion = (newRegion: Region) => {
        if (selectedNodeId) {
            if (isExistGroup(region)) {
                removeNodeFromGroup(region, selectedNodeId);
            }

            if (!isExistGroup(newRegion)) {
                addRegion(newRegion);
            }

            addNodeToGroup(newRegion, selectedNodeId);
            //INFO: 추후 Cloud와 그래프랑 분리 예정이라 따로 처리
            updateProperties(selectedNodeId, {
                region: newRegion,
            });
        }
        setRegion(newRegion);
    };

    const addVPC = (id: string) => {};

    const changeVPC = (vpc: string) => {};
    const addSubnet = (id: string) => {};

    const updateProperties = (id: string, properties: any) => {
        updateNode(id, {
            properties: {
                ...nodes[id].properties,
                ...properties,
            },
        });
    };

    return {
        openCloudAppbar,
        region,
        vpc,
        vpcList,
        changeVPC,
        addResource,
        addRegion,
        changeRegion,
    };
};

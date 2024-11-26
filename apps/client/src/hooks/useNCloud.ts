import {
    NcloudGroupFactory,
    NcloudNodeFactory,
    Regions,
} from '@/src/models/ncloud';
import { GROUP_TYPES } from '@constants';
import { useNCloudContext } from '@contexts/NCloudContext';
import { getInitPoint } from '@helpers/cloud';
import useGraph from '@hooks/useGraph';
import useSelection from '@hooks/useSelection';
import { Region } from '@types';
import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';

export default () => {
    const { selectedNodeId, selectedGroupId } = useSelection();
    const { region, vpc, vpcList, setRegion, setVPC, setVPCList } =
        useNCloudContext();
    const [openCloudAppbar, setOpenCloudAppbar] = useState(false);

    const {
        nodes,
        groups,
        svgRef,
        updateNode,
        addNode,
        addNodeToGroup,
        removeNodeFromGroup,
        isExistSameTypeGroup,
        addGroup,
        isExistGroup,
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
            point: getInitPoint(svgRef.current!),
        });

        if (!isExistGroup(region)) {
            createRegion(region, id);
        } else {
            addNodeToGroup(region, id);
        }
    };

    const createRegion = (region: string, nodeId?: string) => {
        addGroup({
            ...NcloudGroupFactory('region'),
            id: region,
            name: Regions[region].toUpperCase(),
            nodeIds: nodeId ? [nodeId] : [],
        });
    };

    const changeRegion = (newRegion: Region) => {
        if (selectedNodeId) {
            if (isExistGroup(newRegion)) {
                addNodeToGroup(newRegion, selectedNodeId);
            } else {
                createRegion(newRegion, selectedNodeId);
            }
            const properties = nodes[selectedNodeId].properties;
            const relatedGroupIds = GROUP_TYPES.map((type) => properties[type]);

            relatedGroupIds.forEach((groupId) =>
                removeNodeFromGroup(groupId, selectedNodeId),
            );

            const updatedProperties = GROUP_TYPES.reduce((acc, cur) => {
                return {
                    ...acc,
                    [cur]: '',
                };
            }, {});

            updateProperties(selectedNodeId, {
                ...updatedProperties,
                region: newRegion,
            });
        }
        setRegion(newRegion);
    };

    const updateVpc = (newVpc: string) => {
        if (selectedNodeId) {
        }
        setVPC(vpc);
        setVPCList((prev) => [...prev, newVpc]);
    };

    const addSubnet = (id: string) => {};

    const createGroup = () => {};
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
        updateVpc,
        addResource,
        addRegion: createRegion,
        changeRegion,
    };
};

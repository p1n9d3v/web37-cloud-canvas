import {
    NcloudGroupFactory,
    NcloudNodeFactory,
    Regions,
} from '@/src/models/ncloud';
import { NETWORKS_CATEGORIES } from '@constants';
import { useNCloudContext } from '@contexts/NCloudContext';
import { getInitPoint } from '@helpers/cloud';
import useGraph from '@hooks/useGraph';
import useSelection from '@hooks/useSelection';
import { Node, Region } from '@types';
import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';

export default () => {
    const { selectedNodeId, selectedGroupId } = useSelection();
    const {
        region,
        vpc,
        vpcList,
        subnet,
        subnetList,
        setRegion,
        setVpc,
        setSubnet,
        setSubnetList,
        setVpcList,
    } = useNCloudContext();
    const [openCloudAppbar, setOpenCloudAppbar] = useState(false);

    const {
        nodes,
        groups,
        svgRef,
        updateNode,
        addNode,
        addNodeToGroup,
        addChildGroup,
        removeNodeFromGroup,
        isExistSameTypeGroup,
        addGroup,
        isExistGroup,
    } = useGraph();

    useEffect(() => {
        if (selectedNodeId) {
            const node = nodes[selectedNodeId];
            setRegion(node.properties.region);
            setVpc(node.properties.vpc);
            setSubnet(node.properties.subnet);
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

    const createVpc = (vpc: string, nodeId?: string) => {
        addGroup({
            ...NcloudGroupFactory('vpc'),
            id: vpc,
            name: vpc,
            nodeIds: nodeId ? [nodeId] : [],
        });
    };

    const cleanupRelatedGroup = (
        node: Node,
        groupCategories: string[],
        ignoreGroups: string[] = [],
    ) => {
        const properties = node.properties;
        const relatedGroupIds = groupCategories
            .filter((type) => !ignoreGroups.includes(type))
            .map((type) => properties[type])
            .filter(Boolean);

        relatedGroupIds.forEach((groupId) =>
            removeNodeFromGroup(groupId, node.id),
        );
    };

    const updateRegion = (newRegion: Region) => {
        if (selectedNodeId) {
            if (isExistGroup(newRegion)) {
                addNodeToGroup(newRegion, selectedNodeId);
            } else {
                createRegion(newRegion, selectedNodeId);
            }

            cleanupRelatedGroup(nodes[selectedNodeId], NETWORKS_CATEGORIES);

            const updatedProperties = NETWORKS_CATEGORIES.reduce((acc, cur) => {
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
            if (isExistGroup(newVpc)) {
                addNodeToGroup(newVpc, selectedNodeId);
            } else {
                createVpc(newVpc);
            }

            addChildGroup(newVpc, region, selectedNodeId);
            cleanupRelatedGroup(nodes[selectedNodeId], NETWORKS_CATEGORIES, [
                'region',
            ]);

            const updatedProperties = NETWORKS_CATEGORIES.reduce((acc, cur) => {
                return {
                    ...acc,
                    [cur]: '',
                };
            }, {});

            updateProperties(selectedNodeId, {
                ...updatedProperties,
                region,
                vpc: newVpc,
            });
        }
        setVpc(newVpc);
        setVpcList((prev) => ({
            ...prev,
            newVpc,
        }));
    };

    const createSubnet = (subnet: string, nodeId?: string) => {
        addGroup({
            ...NcloudGroupFactory('subnet'),
            id: subnet,
            name: subnet,
            nodeIds: nodeId ? [nodeId] : [],
        });
    };

    const updateSubnet = (newSubnet: string) => {
        if (selectedNodeId) {
            if (isExistGroup(newSubnet)) {
                addNodeToGroup(newSubnet, selectedNodeId);
            } else {
                createSubnet(newSubnet);
            }

            if (vpc || region) {
                addChildGroup(newSubnet, vpc || region, selectedNodeId);
            }
            cleanupRelatedGroup(nodes[selectedNodeId], NETWORKS_CATEGORIES, [
                'region',
                'vpc',
            ]);

            const updatedProperties = NETWORKS_CATEGORIES.reduce((acc, cur) => {
                return {
                    ...acc,
                    [cur]: '',
                };
            }, {});

            updateProperties(selectedNodeId, {
                ...updatedProperties,
                region,
                vpc,
                subnet: newSubnet,
            });
        }

        setSubnet(newSubnet);
        setSubnetList((prev) => ({
            ...prev,
            newSubnet,
        }));
    };

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
        subnet,
        subnetList,
        updateVpc,
        addResource,
        createRegion,
        updateRegion,
        createSubnet,
        updateSubnet,
    };
};

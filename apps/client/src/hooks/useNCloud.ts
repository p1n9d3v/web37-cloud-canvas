import {
    NcloudGroupFactory,
    NcloudNodeFactory,
    Regions,
} from '@/src/models/ncloud';
import { NETWORKS_CATEGORIES } from '@constants';
import { useNCloudContext } from '@contexts/NCloudContext';
import { getInitPoint } from '@helpers/cloud';
import useError from '@hooks/useError';
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
        selectedResource,
        vpcList,
        subnet,
        subnetList,
        setRegion,
        setVpc,
        setSubnet,
        setSubnetList,
        setVpcList,
        setSelectedResource,
    } = useNCloudContext();

    const {
        nodes,
        groups,
        svgRef,
        updateNode,
        addNode,
        addNodeToGroup,
        addChildGroup,
        excludeNodeFromGroup,
        removeNodeFromGroup,
        addGroup,
        isExistGroup,
    } = useGraph();

    const { handleError } = useError();

    useEffect(() => {
        if (selectedNodeId) {
            const node = nodes[selectedNodeId];
            setRegion(node.properties.region);
            setVpc(node.properties.vpc);
            setSubnet(node.properties.subnet);
            setSelectedResource({
                id: selectedNodeId,
                type: node.type,
                properties: node.properties,
            });
        } else {
            setSelectedResource(undefined);
        }
    }, [selectedNodeId, nodes]);

    useEffect(() => {
        setVpcList({
            ...Object.fromEntries(
                Object.entries(groups)
                    .map(([id, group]) => {
                        if (group.type === 'vpc') {
                            return [id, group.name];
                        }
                        return [];
                    })
                    .filter((arr) => arr.length > 0),
            ),
        });

        setSubnetList({
            ...Object.fromEntries(
                Object.entries(groups)
                    .map(([id, group]) => {
                        if (group.type === 'subnet') {
                            return [id, group.name];
                        }
                        return [];
                    })
                    .filter((arr) => arr.length > 0),
            ),
        });
    }, [groups]);

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

    const removeNodeRelatedGroup = (node: Node, groupCategories: string[]) => {
        const properties = node.properties;
        const relatedGroupIds = groupCategories
            .map((type) => properties[type])
            .filter(Boolean);

        relatedGroupIds.forEach((groupId) =>
            removeNodeFromGroup(groupId, node.id),
        );
    };

    const updateRegion = (newRegion: Region) => {
        if (selectedNodeId && region !== newRegion) {
            if (isExistGroup(newRegion)) {
                addNodeToGroup(newRegion, selectedNodeId);
            } else {
                createRegion(newRegion, selectedNodeId);
            }

            removeNodeRelatedGroup(nodes[selectedNodeId], NETWORKS_CATEGORIES);

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
        if (selectedNodeId && vpc !== newVpc) {
            if (
                isExistGroup(newVpc) &&
                region !== groups[newVpc].parentGroupId
            ) {
                handleError(() => {
                    throw new Error(
                        '다른 Region에 속한 VPC로 이동할 수 없습니다.',
                    );
                });
                return;
            }

            if (!isExistGroup(newVpc)) {
                createVpc(newVpc);
            }

            addNodeToGroup(newVpc, selectedNodeId);
            addChildGroup(newVpc, region, selectedNodeId);
            const node = nodes[selectedNodeId];
            removeNodeRelatedGroup(node, NETWORKS_CATEGORIES);

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
        if (selectedNodeId && subnet !== newSubnet) {
            if (
                isExistGroup(newSubnet) &&
                vpc !== groups[newSubnet].parentGroupId
            ) {
                handleError(() => {
                    throw new Error(
                        '다른 VPC에 속한 Subnet로 이동할 수 없습니다.',
                    );
                });
                return;
            }

            if (!isExistGroup(newSubnet)) {
                createSubnet(newSubnet);
            }

            addNodeToGroup(newSubnet, selectedNodeId);
            if (vpc || region) {
                addChildGroup(newSubnet, vpc || region, selectedNodeId);
            }
            const node = nodes[selectedNodeId];
            removeNodeRelatedGroup(node, NETWORKS_CATEGORIES);

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
    };

    const removeVpc = (vpc: string) => {
        if (selectedNodeId) {
            excludeNodeFromGroup(vpc, selectedNodeId);
            updateProperties(selectedNodeId, {
                ...nodes[selectedNodeId].properties,
                vpc: '',
            });
        }
    };

    const removeSubnet = (subnet: string) => {
        if (selectedNodeId) {
            excludeNodeFromGroup(subnet, selectedNodeId);
            updateProperties(selectedNodeId, {
                ...nodes[selectedNodeId].properties,
                subnet: '',
            });
        }
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
        region,
        vpc,
        vpcList,
        subnet,
        subnetList,
        selectedResource,
        updateVpc,
        addResource,
        createRegion,
        removeVpc,
        removeSubnet,
        updateRegion,
        createSubnet,
        updateSubnet,
    };
};

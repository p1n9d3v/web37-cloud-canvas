import { useGraphContext } from '@cloud-graph/contexts/GraphContext';
import { Edge } from '@cloud-graph/types';
import { useState } from 'react';

export default () => {
    const { edges } = useGraphContext();
    const [selectedIds, setSelectedIds] = useState<Set<string>>(
        new Set<string>(),
    );

    const handleSelect = (id: string) => {
        if (selectedIds.has(id)) {
            handleDeselectAll();
            return;
        }
        setSelectedIds(new Set([id]));
    };

    const handleMultiSelect = (id: string) => {
        if (selectedIds.has(id)) {
            handleDeselect(id);
            return;
        }
        setSelectedIds((prev) => {
            const newSet = new Set(prev);
            newSet.add(id);
            return newSet;
        });
    };

    const handleDeselect = (id: string) => {
        setSelectedIds((prev) => {
            const newSet = new Set(prev);
            newSet.delete(id);
            return newSet;
        });
    };

    const handleDeselectAll = () => {
        setSelectedIds(new Set<string>());
    };

    const isSelected = (id: string) => {
        return selectedIds.has(id);
    };

    const handleSelectEntireEdge = (edge: Edge) => {
        if (selectedIds.has(edge.id)) {
            handleDeselectAll();
            return;
        }
        const { source, target } = edge;
        const ids = [edge.id];
        let sourceNode = source.node;
        let targetNode = target.node;
        while (sourceNode.type === 'pointer') {
            const sourceEdge = edges.find(
                (edge) => edge.target.node.id === sourceNode.id,
            );
            sourceNode = sourceEdge!.source.node;
            ids.push(sourceEdge!.id);
        }
        while (targetNode.type === 'pointer') {
            const targetEdge = edges.find(
                (edge) => edge.source.node.id === targetNode.id,
            );
            targetNode = targetEdge!.target.node;
            ids.push(targetEdge!.id);
        }

        setSelectedIds(new Set(ids));
    };

    return {
        selectedIds,
        isSelected,
        handleSelect,
        handleMultiSelect,
        handleDeselect,
        handleDeselectAll,
        handleSelectEntireEdge,
    };
};

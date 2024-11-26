import { Group } from '@types';

export type GroupState = {
    groups: Record<string, Group>;
};

export type GroupAction =
    | { type: 'ADD_GROUP'; payload: Group }
    | { type: 'UPDATE_GROUP'; payload: Partial<Group> & { id: string } }
    | { type: 'REMOVE_GROUP'; payload: { id: string } }
    | {
          type: 'CHANGE_NODE_GROUP';
          paylod: {
              id: string;
              nodeId: string;
          };
      }
    | {
          type: 'CHANGE_GROUP';
          payload: { fromId: string; toId: string };
      }
    | {
          type: 'ADD_NODE_TO_GROUP';
          payload: { id: string; nodeId: string };
      }
    | {
          type: 'REMOVE_NODE_FROM_GROUP';
          payload: { id: string; nodeId: string };
      };

export const groupReducer = (
    state: GroupState,
    action: GroupAction,
): GroupState => {
    switch (action.type) {
        case 'ADD_GROUP':
            return {
                ...state,
                groups: {
                    ...state.groups,
                    [action.payload.id]: action.payload,
                },
            };
        case 'UPDATE_GROUP':
            return {
                ...state,
                groups: {
                    ...state.groups,
                    [action.payload.id]: {
                        ...state.groups[action.payload.id],
                        ...action.payload,
                    },
                },
            };
        case 'REMOVE_GROUP': {
            const { id } = action.payload;
            const { [id]: removedGroup, ...remainingGroups } = state.groups;
            const findParentGroup = Object.values(remainingGroups).find(
                (group) => group.childGroupIds.includes(id),
            );
            if (findParentGroup) {
                const childGroupsIds = findParentGroup.childGroupIds.filter(
                    (childGroupId) => childGroupId !== id,
                );
                remainingGroups[findParentGroup.id] = {
                    ...findParentGroup,
                    childGroupIds: childGroupsIds,
                };
            }

            return {
                ...state,
                groups: remainingGroups,
            };
        }
        case 'ADD_NODE_TO_GROUP': {
            const { id, nodeId } = action.payload;
            const group = state.groups[id];
            if (!group) return state;
            const nodeIds = new Set([...group.nodeIds, nodeId]);
            return {
                ...state,
                groups: {
                    ...state.groups,
                    [id]: {
                        ...group,
                        nodeIds: Array.from(nodeIds),
                    },
                },
            };
        }
        case 'REMOVE_NODE_FROM_GROUP': {
            const { id, nodeId } = action.payload;
            const group = state.groups[id];
            if (!group) return state;

            if (group.nodeIds.length === 1) {
                const { [id]: removedGroup, ...remainingGroups } = state.groups;
                const findParentGroups = Object.values(remainingGroups).filter(
                    (group) => group.childGroupIds.includes(id),
                );

                const updatedGroups = findParentGroups.reduce((acc, cur) => {
                    return {
                        ...acc,
                        [cur.id]: {
                            ...cur,
                            childGroupIds: cur.childGroupIds.filter(
                                (childGroupId) => childGroupId !== id,
                            ),
                        },
                    };
                }, {});

                return {
                    ...state,
                    groups: updatedGroups,
                };
            }

            return {
                ...state,
                groups: {
                    ...state.groups,
                    [id]: {
                        ...group,
                        nodeIds: group.nodeIds.filter(
                            (_nodeId) => _nodeId !== nodeId,
                        ),
                    },
                },
            };
        }
        default:
            return state;
    }
};

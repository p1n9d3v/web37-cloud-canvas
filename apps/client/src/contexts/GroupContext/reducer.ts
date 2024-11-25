import { Group } from '@types';

export type GroupState = {
    groups: Record<string, Group>;
};

export type GroupAction =
    | { type: 'ADD_GROUP'; payload: Group }
    | { type: 'UPDATE_GROUP'; payload: Partial<Group> & { id: string } }
    | { type: 'REMOVE_GROUP'; payload: { id: string } }
    | {
          type: 'REMOVE_NODE_FROM_GROUP';
          payload: { id: string; nodeId: string };
      }
    | {
          type: 'ADD_NODE_TO_GROUP';
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
            return {
                ...state,
                groups: remainingGroups,
            };
        }
        case 'ADD_NODE_TO_GROUP': {
            const { id, nodeId } = action.payload;
            const group = state.groups[id];
            if (!group) return state;
            return {
                ...state,
                groups: {
                    ...state.groups,
                    [id]: {
                        ...state.groups[id],
                        nodeIds: [...state.groups[id].nodeIds, nodeId],
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
                return {
                    ...state,
                    groups: remainingGroups,
                };
            }
            return {
                ...state,
                groups: {
                    ...state.groups,
                    [id]: {
                        ...group,
                        nodeIds: group.nodeIds.filter((id) => id !== nodeId),
                    },
                },
            };
        }
        default:
            return state;
    }
};

import { Group, Point, Dimension } from '@types';

export type GroupState = {
    groups: Record<string, Group>;
};

export type GroupAction =
    | { type: 'ADD_GROUP'; payload: Group }
    | { type: 'UPDATE_GROUP'; payload: Partial<Group> & { id: string } }
    | { type: 'DELETE_GROUP'; payload: { id: string } }
    | {
          type: 'MOVE_GROUP';
          payload: { id: string; point: Point; dimension: Dimension };
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
        case 'DELETE_GROUP': {
            const { id } = action.payload;
            const { [id]: removedGroup, ...remainingGroups } = state.groups;
            return {
                ...state,
                groups: remainingGroups,
            };
        }
        case 'MOVE_GROUP': {
            const { id, point } = action.payload;
            const group = state.groups[id];
            if (!group) return state;
            return {
                ...state,
                groups: {
                    ...state.groups,
                    [id]: {
                        ...group,
                        bounds: {
                            ...group.bounds,
                            x: point.x,
                            y: point.y,
                        },
                    },
                },
            };
        }
        default:
            return state;
    }
};

import { Group } from '@types';

export type GroupState = {
    groups: Record<string, Group>;
};

export type GroupAction =
    | { type: 'ADD_GROUP'; payload: Group }
    | { type: 'UPDATE_GROUP'; payload: Partial<Group> & { id: string } }
    | { type: 'DELETE_GROUP'; payload: { id: string } };

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
        default:
            return state;
    }
};

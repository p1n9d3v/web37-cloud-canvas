import { Point } from '@cloudflow/types';

export interface ConnectionState {
    isConnecting: boolean;
    connection: {
        id: string;
        start: Point;
        end: Point;
    } | null;
}

export type ConnectionAction =
    | {
          type: 'START_CONNECTION';
          payload: { id: string; point: { x: number; y: number } };
      }
    | {
          type: 'MOVE_CONNECTION';
          payload: { x: number; y: number };
      }
    | {
          type: 'END_CONNECTION';
      };

export const initialConnectionState: ConnectionState = {
    isConnecting: false,
    connection: null,
};

export const connectionReducer = (
    state: ConnectionState,
    action: ConnectionAction
): ConnectionState => {
    switch (action.type) {
        case 'START_CONNECTION':
            return {
                ...state,
                isConnecting: true,
                connection: {
                    id: action.payload.id,
                    start: action.payload.point,
                    end: action.payload.point,
                },
            };
        case 'MOVE_CONNECTION':
            return {
                ...state,
                connection: {
                    ...state.connection!,
                    end: {
                        ...action.payload,
                    },
                },
            };
        case 'END_CONNECTION':
            return initialConnectionState;
        default:
            return state;
    }
};

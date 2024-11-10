import { Anchor, Point } from '@cloudflow/types';

export interface ConnectionState {
    isConnecting: boolean;
    connection: {
        start: Point;
        end: Point;
    } | null;
    sourceAnchor: Anchor | null;
    targetAnchor: Anchor | null;
}

export type ConnectionAction =
    | {
          type: 'START_CONNECTION';
          payload: Point;
      }
    | {
          type: 'MOVE_CONNECTION';
          payload: Point;
      }
    | {
          type: 'RESET_CONNECTION';
      }
    | {
          type: 'SET_SOURCE_ANCHOR';
          payload: Anchor | null;
      }
    | {
          type: 'SET_TARGET_ANCHOR';
          payload: Anchor | null;
      };

export const initialConnectionState: ConnectionState = {
    isConnecting: false,
    connection: null,
    targetAnchor: null,
    sourceAnchor: null,
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
                    start: action.payload,
                    end: action.payload,
                },
            };
        case 'MOVE_CONNECTION':
            return {
                ...state,
                connection: {
                    ...state.connection!,
                    end: {
                        x: action.payload.x,
                        y: action.payload.y,
                    },
                },
            };
        case 'RESET_CONNECTION':
            return initialConnectionState;
        case 'SET_SOURCE_ANCHOR': {
            return {
                ...state,
                sourceAnchor: action.payload && {
                    ...action.payload,
                },
            };
        }
        case 'SET_TARGET_ANCHOR':
            return {
                ...state,
                targetAnchor: action.payload && {
                    ...action.payload,
                },
            };
        default:
            return state;
    }
};

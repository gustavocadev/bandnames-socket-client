import { SocketState } from './';

type SocketAction = {
  type: 'ACTION_NAME';
  payload: string;
};

const socketReducer = (state: SocketState, action: SocketAction) => {
  switch (action.type) {
    case 'ACTION_NAME':
      return {
        ...state,
      };
    default:
      return state;
  }
};
export { socketReducer };

import { ReactNode, useReducer } from 'react';
import { useSocket } from '../../hooks/useSocket';
import { SocketContext, socketReducer } from './';

export type SocketState = {};

// const SOCKET_INITIAL_STATE: SocketState = {};

type Props = {
  children: ReactNode;
};

const SocketProvider = ({ children }: Props) => {
  // const [state, dispatch] = useReducer(socketReducer, SOCKET_INITIAL_STATE);
  const { ...socketBody } = useSocket('http://localhost:4000');
  return (
    <SocketContext.Provider
      value={{
        // ...state,
        ...socketBody,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
export { SocketProvider };

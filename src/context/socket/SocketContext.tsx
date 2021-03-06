import { createContext } from 'react';
import { Socket } from 'socket.io-client';

type ContextProps = {
  socket: Socket;
  online: boolean;
};

export const SocketContext = createContext({} as ContextProps);

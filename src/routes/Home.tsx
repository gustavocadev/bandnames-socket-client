import BandList from '../components/BandList';
import BandAdd from '../components/BandAdd';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { Band } from '../types/types';

const connectSocketServer = () => {
  const socket = io('http://localhost:4000', { transports: ['websocket'] });
  return socket;
};

type Props = {};
const Home = (props: Props) => {
  const [socket] = useState(connectSocketServer());
  const [online, setOnline] = useState<boolean>(false);
  const [bands, setBands] = useState<Band[]>([]);

  useEffect(() => {
    setOnline(socket.connected);
  }, [socket]);

  useEffect(() => {
    socket.on('connect', () => {
      setOnline(true);
    });
  }, [socket]);

  useEffect(() => {
    socket.on('disconnect', () => {
      setOnline(false);
    });
  }, [socket]);

  useEffect(() => {
    socket.on('current-bands', (payload) => {
      setBands(payload);
    });
  }, []);

  const vote = (id: string) => {
    socket.emit('vote-band', id);
  };

  const deleteBand = (id: string) => {
    socket.emit('delete-band', id);
  };

  const changeName = (id: string, name: string) => {
    socket.emit('change-band-name', { id, name });
  };

  const createNewBand = (name: string) => {
    socket.emit('new-band', { name });
  };

  return (
    <>
      <section className="mt-2">
        <p className="text-lg">
          Service Status:{' '}
          {online ? (
            <span className="text-green-600 font-semibold">Online</span>
          ) : (
            <span className="text-red-500 font-semibold">Offline</span>
          )}
        </p>
      </section>
      <h1 className="text-3xl mt-4">BandNames App</h1>
      <hr />
      <section className="grid grid-cols-12 gap-2  mt-4 ">
        <div className="col-span-8">
          <BandList
            data={bands}
            vote={vote}
            deleteBand={deleteBand}
            changeName={changeName}
          />
        </div>
        <div className="col-span-4 ">
          <BandAdd createNewBand={createNewBand} />
        </div>
      </section>
    </>
  );
};
export default Home;

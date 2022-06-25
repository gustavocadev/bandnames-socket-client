import BandList from '../components/BandList';
import BandAdd from '../components/BandAdd';
import { useContext } from 'react';
import { SocketContext } from '../context/socket';
import BandChart from '../components/BandChart';

type Props = {};
const Home = (props: Props) => {
  // const [bands, setBands] = us eState<Band[]>([]);
  const { socket, online } = useContext(SocketContext);

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
      <section className="w-8/12 mx-auto">
        <BandChart />
      </section>
      <section className="grid grid-cols-12 gap-2  mt-4 ">
        <div className="col-span-8">
          <BandList />
        </div>
        <div className="col-span-4 ">
          <BandAdd />
        </div>
      </section>
    </>
  );
};
export default Home;

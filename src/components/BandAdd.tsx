import { FormEvent, useContext, useState } from 'react';
import { SocketContext } from '../context/socket';

type Props = {};

const BandAdd = ({}: Props) => {
  const [bandName, setBandName] = useState('');

  const { socket } = useContext(SocketContext);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (bandName.trim().length <= 0) return;

    // emit
    socket.emit('new-band', { name: bandName });

    // clear the input
    setBandName('');
  };

  return (
    <>
      <h1 className="text-3xl">Agregar Banda</h1>
      <form className="my-2" onSubmit={handleSubmit}>
        <input
          type="text"
          className="border rounded border-gray-500 p-2 outline-none w-full"
          placeholder="Nuevo nombre de entrada"
          value={bandName}
          onChange={({ target }) => setBandName(target.value)}
        />
      </form>
    </>
  );
};
export default BandAdd;

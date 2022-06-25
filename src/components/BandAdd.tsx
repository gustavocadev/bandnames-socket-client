import { FormEvent, useState } from 'react';

type Props = {
  createNewBand: (name: string) => void;
};
const BandAdd = ({ createNewBand }: Props) => {
  const [bandName, setBandName] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (bandName.trim().length <= 0) return;

    // emit
    createNewBand(bandName);

    // clear the input
    setBandName('');
    console.log(bandName);
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

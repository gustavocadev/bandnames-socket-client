import { Band } from '../types/types';
import { ChangeEvent, useEffect, useState } from 'react';
type Props = {
  data: Band[];
  vote: (id: string) => void;
  deleteBand: (id: string) => void;
  changeName: (id: string, name: string) => void;
};
const BandList = ({ data, vote, deleteBand, changeName }: Props) => {
  const [bands, setBands] = useState(data);

  const handleNameChange = (
    { target }: ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const updatedBands = bands.map((band) => {
      if (band.id !== id) return band;

      return {
        ...band,
        name: target.value,
      };
    });
    setBands(updatedBands);
  };

  useEffect(() => {
    setBands(data);
  }, [data]);

  const handleLostFocusBlur = (id: string, name: string) => {
    console.log(id, name);
    console.log('Lost focus');
    changeName(id, name);
  };

  const createRows = () => {
    return bands.map((band) => {
      return (
        <tr key={band.id}>
          <td className="px-3 py-2">
            <button
              className="rounded bg-blue-500 py-2 px-4 text-xl"
              onClick={() => vote(band.id)}
            >
              +1
            </button>
          </td>
          <td className="px-3 py-2">
            <input
              type="text"
              className=" outline-none rounded p-2 bg-gray-700 w-full text-lg"
              value={band.name}
              onChange={(event) => handleNameChange(event, band.id)}
              onBlur={() => handleLostFocusBlur(band.id, band.name)}
            />
          </td>
          <td className="px-3 py-2">
            <h3 className="text-3xl">{band.votes}</h3>
          </td>
          <td className="px-3 py-2">
            <button
              className="rounded bg-red-500 py-2 px-4 text-xl"
              onClick={() => deleteBand(band.id)}
            >
              Borrar
            </button>
          </td>
        </tr>
      );
    });
  };

  return (
    <>
      <div className="container p-2 mx-auto sm:p-4 dark:text-gray-100 ">
        <div className="overflow-x-auto rounded">
          <table className="w-full p-6 text-left whitespace-nowrap text-md">
            {/* <colgroup>
                  <col className="w-5">
                  <col>
                  <col>
                  <col>
                  <col>
                  <col>
            <col className="w-5">
          </colgroup> */}
            <thead>
              <tr className="dark:bg-gray-700">
                <th className="p-3"></th>
                <th className="p-3">Name</th>
                <th className="p-3">Votos</th>
                <th className="p-3">Borrar</th>
              </tr>
            </thead>
            <tbody className="border-b dark:bg-gray-900 dark:border-gray-700">
              {createRows()}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default BandList;

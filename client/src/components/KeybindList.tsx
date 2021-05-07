import React, { useMemo } from 'react';
import _ from 'lodash';
import Table from '../ui/Table';
import { useFavs } from '../context/FavContext';
import { addFavorites } from '../service/queryFns';

type Props = {
  sheetData: any[];
  columns: any;
  titleField: string;
};

const KeybindList = ({ sheetData, columns, titleField }: Props) => {
  const categories = useMemo(
    () => Array.from(new Set(sheetData.map((el) => el[titleField].name))),
    [sheetData, titleField]
  );

  // const { favs, setFavs } = useFavs();

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log('clicked submit');
  //   console.log('favs', favs);
  //   addFavorites(favs);
  //   // route to favs sheet ?
  // };

  return (
    <div>
      {categories.map((title, i) => {
        const tableData = _.filter(sheetData, {
          [titleField]: { name: title },
        });
        return (
          <Table key={i} title={title} data={tableData} columns={columns} />
        );
      })}
      {/* <div className="flex justify-center">
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full max-w-md mt-11 bg-gray-700 text-white px-6 py-3 mb-1 mr-1 text-sm font-bold uppercase transition-all duration-150 ease-linear rounded shadow outline-none hover:shadow-lg focus:outline-none"
        >
          Save
        </button>
      </div> */}
    </div>
  );
};

export default KeybindList;

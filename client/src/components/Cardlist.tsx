import Link from 'next/link';
import data from '../lib/mockData/index';
import Card from './Card';

const Cardlist = () => {
  return (
    <div>
      <ul className="my-12 md:flex md:flex-wrap md:justify-center">
        {data.map((list) => (
          <li key={list[0].cheatsheetId}>
            <Link href={`/sheets/${list[0].cheatsheet}`}>
              <a>
                <Card list={list} />
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cardlist;

import Link from 'next/link';
import Card from './Card';

const Cardlist = ({ data, title }) => {
  if (data) {
    return (
      <div className="flex justify-center">
        <ul className="my-12 md:flex md:flex-wrap md:justify-center">
          {data.map((list, i) => (
            <li key={list.id} className="mb-10 md:mb-0 md:mx-5">
              <Link href={`/${title}/${list.name}`}>
                <a className="hover:no-underline">
                  <Card list={list} />
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  } else {
    return null;
  }
};

export default Cardlist;

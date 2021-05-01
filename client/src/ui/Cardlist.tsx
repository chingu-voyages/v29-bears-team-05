import Link from 'next/link';
import Card from './Card';

const Cardlist = ({ data, title }) => {
  if (data) {
    return (
      <div>
        <ul className="my-12 md:flex md:flex-wrap md:justify-center">
          {data.map((list, i) => (
            <li key={list.id}>
              <Link href={`/${title}/${list.name}`}>
                <a>
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

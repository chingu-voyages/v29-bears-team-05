import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col">
      <h1>Landing Page</h1>
      <Link href={`/sheets/`}>cheatsheets</Link>
      <Link href={`/myfavorites/`}>my favorites</Link>
    </div>
  );
}

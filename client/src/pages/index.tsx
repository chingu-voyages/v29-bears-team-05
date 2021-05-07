import Hero from '../components/LandingPage/Hero';
import Explainer from '../components/LandingPage/Explainer';
import SheetSelector from '../components/LandingPage/SheetSelector';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      {/* below two lines just for testing routes */}
      <Link href={`/sheets`}>sheets</Link>
      <br />
      <Link href={`/myfavorites`}>myfavorites</Link>
      <Hero />
      <Explainer />
      <SheetSelector />
    </>
  );
}

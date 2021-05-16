import Hero from '../components/LandingPage/Hero';
import Explainer from '../components/LandingPage/Explainer';
import SheetSelector from '../components/LandingPage/SheetSelector';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      {/* below few lines just for testing nextjs Linked routes
      <Link href={`/sheets`}>Nextjs Link: sheets</Link>
      <br />
      <Link href={`/myfavorites`}>Nextjs Link: myfavorites</Link>
      */}
      <Hero />
      <Explainer />
      <SheetSelector />
    </>
  );
}

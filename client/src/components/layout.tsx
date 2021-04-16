import Head from 'next/head';

export const siteTitle = 'Next.js Sample Website';

export default function Layout({
  children,
  home,
}: {
  children: React.ReactNode;
  home?: boolean;
}) {
  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <div className="flex flex-col min-h-screen ">
      <nav className="flex justify-between">
        <h1>KEYBOUND</h1>
        <div>
          <button>Signup</button>
          <button>Login</button>
        </div>
      </nav>
      <header></header>
        <main className="flex-grow">{children}</main>
        <footer className="w-full text-center border-t border-grey p-4 bg-gray-700 text-gray-100 text-base">
          <p>&#169; Chingu v29 bears-team-05</p>
        </footer>
      </div>
    </div>
  );
}
 
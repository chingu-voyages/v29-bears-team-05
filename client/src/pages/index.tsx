

export default function Home() {
  return (
    <>
      {/*Hero*/}
      <div className="grid grid-cols-1 py-20 px-3 bg-gray-700 flex justify-items-center text-center">
        <h1 className="text-white text-5xl font-bold mb-10">Become A Keybinding Pro</h1>
        <h4 className="text-green-200 text-xl font-bold mb-10">Interactive sheets of must-know keyboard shortcuts for a variety of popular programs</h4>
        <a href="/sheets" className="text-black"><button className="transition duration-500 ease-in-out border border-green-300 py-2 px-2 rounded bg-green-300 font-bold transform hover:-translate-y-1 hover:scale-110 mb-10 focus:outline-none">View All</button></a>
        <h4 className="text-white text-lg font-bold z-10">Join other developers and level up your typing game</h4>
      </div>
      <div className="bg-gray-700 md:h-52 md:transform md:skew-y-6 md:transform md:-translate-y-28 z-0"></div>
      {/*Explainer*/}
      <div className="flex justify-items-center grid grid-cols-1 py-20 md:pt-0 px-3">
        <h1 className="text-4xl font-bold">How It Works</h1>
        <div className="grid grid-cols-1 text-center md:grid-cols-2 md:text-left mt-10 md:mt-20 flex justify-items-center">
          <div className="mb-10 md:mb-0">
            <h1 className="text-2xl font-bold">Practical Shortcuts</h1>
            <h4 className="my-10 text-xl text-green-400">Keybindings you will use time and again!</h4>
            <p className="text-lg">Browse full reference sheets of keybindings and curate your own favorites lists</p>
          </div>
          <div className="border border-gray-700 py-20 px-10 w-10/12 text-center">
            **GIF will go here**
          </div>
        </div>
      </div>
      {/*Choose Your Program*/}
      <div className="bg-gray-700 md:h-52 md:transform md:skew-y-6 md:transform md:translate-y-24 z-0"></div>
      <div className="my-100 py-40 bg-gray-700 text-center">Hello</div>
    </>
  );
}

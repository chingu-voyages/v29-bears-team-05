import Image from 'next/image'

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
      <div className="flex justify-items-center grid grid-cols-1 py-20 md:pt-0 px-5 md:px-20">
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
      <div className="bg-gray-700 md:h-48 md:transform md:skew-y-6 md:transform md:translate-y-24 md:z-0 text-center">
        <h1 className="md: transform md:-skew-y-6 py-20 md:py-28 text-4xl font-bold text-white px-3">Choose Your Program</h1>
      </div>
      <div className="grid grid-col-1 md:grid-flow-col md:auto-cols-auto md:pt-28 pb-40 bg-gray-700 flex justify-center">
        <div className="group text-center">
          <a href="/sheets/vscode"><Image src="/images/vscode.png" alt="vscode" width="96" height="96" className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"/></a>
          <p className="transition duration-500 ease-in-out text-white font-bold text-opacity-0 group-hover:text-green-300">VS Code</p>
        </div>
        <div className="group text-center">
          <a href="/sheets/photoshop"><Image src="/images/photoshop.png" alt="vscode" width="96" height="96" className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"/></a>
          <p className="transition duration-500 ease-in-out text-white font-bold text-opacity-0 group-hover:text-green-300">Adobe Photoshop</p>
        </div>
      </div>
    </>
  );
}
 
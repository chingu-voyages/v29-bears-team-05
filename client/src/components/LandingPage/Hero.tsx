import Link from 'next/link';

export default function Hero() {
    return (
        <>
            <div className="grid grid-cols-1 py-20 px-3 bg-gray-700 flex justify-items-center text-center">
                <h1 className="text-white text-5xl font-bold mb-10">Become A Keybinding Pro</h1>
                <h4 className="text-green-200 text-xl font-bold mb-10">Interactive sheets of must-know keyboard shortcuts for a variety of popular programs</h4>
                <Link href="/sheets">
                    <a className="text-black"><button className="transition duration-500 ease-in-out border border-green-300 py-2 px-2 rounded bg-green-300 font-bold transform hover:-translate-y-1 hover:scale-110 mb-10 focus:outline-none">View All</button></a>
                </Link>
                <h4 className="text-white text-lg font-bold z-10">Join other developers and level up your typing game</h4>
            </div>
            <div className="bg-gray-700 md:h-52 md:transform md:skew-y-6 md:transform md:-translate-y-28 z-0"></div>
        </>
    );
}

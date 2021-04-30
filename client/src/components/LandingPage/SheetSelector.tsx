import Image from 'next/image'

export default function SheetSelector() {
    return (
        <>
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
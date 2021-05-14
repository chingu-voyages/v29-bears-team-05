import Image from 'next/image';

export default function Explainer() {
    return (
        <>
            <div className="flex justify-items-center grid grid-cols-1 py-20 md:pt-0 px-5 md:px-20">
                <h1 className="text-4xl font-bold">How It Works</h1>
                <div className="grid grid-cols-1 text-center lg:grid-cols-2 lg:text-left mt-10 md:mt-20 flex justify-items-center">
                    <div className="mb-10 md:mb-0">
                        <h1 className="text-2xl font-bold">Practical Shortcuts</h1>
                        <h4 className="my-10 text-xl text-green-400">Keybindings you will use time and again!</h4>
                        <p className="text-lg">Browse full reference sheets of keybindings and curate your own favorites lists</p>
                    </div>
                    <div className="border border-gray-700 text-center p-0 flex justify-center shadow-xl md:mt-10 lg:mt-0 lg:ml-5">
                        <Image src="/images/keybound.gif" alt="gif" width="800" height="400" /> 
                    </div>
                </div>
            </div>
        </>
    );
}

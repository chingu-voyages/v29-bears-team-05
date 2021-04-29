export default function Explainer() {
    return (
        <>
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
        </>
    );
}
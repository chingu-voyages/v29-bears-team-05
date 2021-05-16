const Card = ({ list }) => {
  return (
    <div className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">
      <div className="grid grid-cols-1 p-8 m-1 bg-gray-700 rounded-full sm:max-w-lg sm:mx-auto md:mx-1 w-44 h-44 flex justify-center items-center">
        <h1 className="text-xl text-center font-bold text-green-300">{list.name}</h1>
        <img className="justify-self-center" src={`/images/${list.name}.png`} alt={`${list.name} logo`} />
      </div>
    </div>
  );
};

export default Card;

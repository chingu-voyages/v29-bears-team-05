const Card = ({ list }) => {
  return (
    <div>
      <div className="p-8 m-1 bg-gray-700 rounded-lg sm:max-w-lg sm:mx-auto md:mx-1 md:w-80 md:h-48">
        <img src="#" alt={`${list.name} logo`} />
      </div>
    </div>
  );
};

export default Card;

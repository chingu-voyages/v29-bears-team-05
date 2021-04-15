const Card = ({ list }) => {
    return (
      <div>
        <div className='sm:max-w-lg sm:mx-auto md:mx-1 md:w-80 md:h-48 p-8 bg-gray-700 rounded-lg m-1'>
          <img src="#" alt={`${list[0].cheatsheet} logo`} />
        </div>
      </div>
    );
  };
  
  export default Card;
  
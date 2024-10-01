const Button = ({onClick, value, classname} ) => {
  console.log("BUTTON COMPONENT RENDERS",);
  
    return (
      <button
        className={` font-bold bg-black mt-4 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${classname}`}
        onClick={onClick}
      >
        {value}
      </button>
    );
  }

  export default Button;
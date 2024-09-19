const Button = () => {
    return (
      <button
        className={`w-full bg-black mt-4 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${props.classname}`}
        onClick={props.onClick}
      >
        {props.value}
      </button>
    );
  }

  export default Button;
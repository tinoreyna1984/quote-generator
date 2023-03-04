export default function Button({ text, handleClick }) {
    return (
        <button onClick={handleClick}
            className='border-solid rounded-md text-white bg-sky-700 shadow-2xl
              focus:outline-none
              transition-all duration-700 hover:ease-in-out hover:duration-700 hover:bg-sky-800 hover:shadow-3xl
              active:ease-in-out active:duration-300 active:bg-sky-900
              py-3 px-5' type='button'
        >
            {text}
        </button>
    );
}
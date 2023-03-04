export default function Quote({ text, author, genre }) {
    return (
        <div className='flex flex-col items-end my-6 mx-8'>
            <q className='text-start italic border-r-4'>
                {text}
            </q>
            <div className="flex flex-col items-end my-4 px-5 py-3
                transition-all duration-500 ease-in-out cursor-pointer hover:shadow-lg hover:rounded-lg">
                <p className='text-end'>{author}</p>
                <p className='text-end text-sm'>{genre}</p>
            </div>
        </div>
    );
}
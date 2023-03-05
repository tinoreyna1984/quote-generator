import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux';
import { changePage, startLoad } from '../../redux/quotesSlice';

export default function Author() {

    const router = useRouter()
    const { authorSearch } = router.query

    const {quotes, currentPage, nextPage, totalQuotes, loading} = useSelector(state => state.quotes)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(startLoad(authorSearch, currentPage));
    }, [currentPage])

    /* console.log("page: ", currentPage)
    console.log("number of quotes: ", quotes.length);
    console.log("total quotes: ", totalQuotes) */

    const handleLoadMore = () => {
        if(nextPage === null || quotes.length >= totalQuotes) return;
        dispatch(changePage())
    }

    return (
        <>
            <Head>
                <title>Quotes by {authorSearch}</title>
                <meta name="description" content={`Quotes by ${authorSearch}`} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className='flex justify-center items-center'>
                <div className='flex flex-col items-center my-3 mx-3 lg:mx-5'>
                    <h1 className='text-2xl font-black drop-shadow-xl'>Random Quote Generator</h1>
                    <p className='my-5'>More quotes from {authorSearch}:</p>
                    {
                        loading ?
                            (<h2 className='text-xl drop-shadow-xl text-center my-6 mx-8'>Loading...</h2>) :
                            (quotes?.map(
                                ele =>
                                (<div key={ele._id} className='flex flex-col items-end my-6 mx-8'>
                                    <q className='text-start italic border-r-4'>
                                        {ele.quoteText}
                                    </q>
                                </div>)
                            )
                            )
                    }
                    <div className='flex flex-row'>
                        <button className='border-solid rounded-md text-white bg-zinc-400 shadow-2xl
                                        focus:outline-none
                                        transition-all duration-700 hover:ease-in-out hover:duration-700 hover:bg-zinc-500 hover:shadow-3xl
                                        active:ease-in-out active:duration-300 active:bg-zinc-600
                                        py-3 px-5'
                            onClick={handleLoadMore}
                        >
                            Load more
                        </button>
                        <Link className='border-solid rounded-md text-white bg-sky-700 shadow-2xl
                                        focus:outline-none
                                        transition-all duration-700 hover:ease-in-out hover:duration-700 hover:bg-sky-800 hover:shadow-3xl
                                        active:ease-in-out active:duration-300 active:bg-sky-900
                                        ml-4
                                        py-3 px-5'
                            href={`/`}
                        >
                            Back to home
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
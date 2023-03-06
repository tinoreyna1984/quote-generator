import Head from 'next/head'
import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react'
import { randomQuoteObject } from '../helpers/randomQuoteObject'
import Quote from '../components/quote'
import Button from '../components/button'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [quote, setQuote] = useState({})
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function onLoadQuote() {
      setLoading(true)
      let rq = await randomQuoteObject();
      return rq;
    }
    onLoadQuote().then(res => setQuote(res)).then(() => setLoading(false)).catch(e => console.log("Oops! Something happened: ", e));
  }, [])

  const handleClick = async () => {
    setLoading(true)
    let quoteObject = await randomQuoteObject();
    setQuote(quoteObject)
    setLoading(false)
  }

  const { quoteAuthor, quoteText, quoteGenre } = quote

  return (
    <>
      <Head>
        <title>Quote generator</title>
        <meta name="description" content="Quote generator" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {
        loading ?
          (<div className='flex h-screen w-full justify-center items-center'>
            <div className='flex flex-col items-start my-3 mx-3 md:mx-4 lg:mx-5'>
              <h1 className='text-2xl font-black drop-shadow-xl text-center'>Loading...</h1>
              <div className='flex flex-col items-end my-6 mx-8 animate-pulse'>
                <div className='text-start italic border-r-4'>
                  <div className="h-6 w-[300px] md:w-[450px] lg:w-[600px] rounded-md bg-gray-300 "></div>
                </div>
                <div className="flex flex-col items-end gap-2 my-4 py-3">
                  <div className="h-4 w-[200px] rounded-md bg-gray-300 "></div>
                  <div className="h-4 w-[200px] rounded-md bg-gray-300 "></div>
                </div>
              </div>
              <button
                className='border-solid rounded-md bg-gray-300 w-[200px]
                py-3 px-5 animate-pulse' type='button'
              >
                <div className="h-6 w-full rounded-md bg-gray-300 "></div>
              </button>
            </div>
          </div>) :
          (<div className='flex h-screen w-full justify-center items-center'>
            <div className='flex flex-col items-start my-3 mx-3 md:mx-4 lg:mx-5'>
              <h1 className='text-2xl font-black drop-shadow-xl'>Random Quote Generator</h1>
              <Quote text={quoteText} author={quoteAuthor} genre={quoteGenre} />
              <Button text="Generate another random quote" handleClick={() => handleClick()} />
            </div>
          </div>)
      }
    </>
  )
}

import Head from 'next/head'
import { Inter } from '@next/font/google'
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
    onLoadQuote().then(res => setQuote(res)).then(() => setLoading(false));
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

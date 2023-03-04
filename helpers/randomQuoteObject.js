import { randomIntFromInterval } from './randomIntFromInterval'

export const randomQuoteObject = async () => {
  let randomPage = randomIntFromInterval(1, 72672);
  let quoteFetch = await fetch(`https://quote-garden.onrender.com/api/v3/quotes?limit=1&page=${randomPage}`);
  let { data } = await quoteFetch.json();
  let quoteObject = data[0];
  return quoteObject;
}
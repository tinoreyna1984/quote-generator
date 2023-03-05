import { createSlice } from "@reduxjs/toolkit";

export const quotesSlice = createSlice({
    name: "quotes",
    initialState: {
        quotes: [],
        currentPage: 1,
        nextPage: null,
        totalQuotes: 0,
        loading: false
    },
    reducers: {
        initState: (state, action) => {
            const {data, currentPage, nextPage, totalQuotes} = action.payload;
            state.quotes = data;
            state.currentPage = currentPage;
            state.nextPage = nextPage;
            state.totalQuotes = totalQuotes;
        },
        setLoadingState: (state, action) => {
            state.loading = action.payload;
        },
        changePage: (state) => {
            state.currentPage = state.currentPage + 1;
        },
        addMoreQuotes: (state, action) => {
            const {data, currentPage, totalQuotes} = action.payload
            state.quotes = state.quotes.concat(data);
            state.currentPage = currentPage;
            state.totalQuotes = totalQuotes;
        }
    }
})

// start loading
export const startLoad = (authorSearch, currentPage) => {
    return async (dispatch) => {
        dispatch(setLoadingState(true))
        let fetchQuotes = await fetch(`https://quote-garden.onrender.com/api/v3/quotes?page=${currentPage}&author=${authorSearch}`);
        let {data, pagination: {nextPage}, totalQuotes} = await fetchQuotes.json()
        dispatch(setLoadingState(false))
        if(currentPage === 1) // first load
            dispatch( initState( {data, currentPage, nextPage, totalQuotes} ) );
        else
            dispatch( addMoreQuotes({data, currentPage, totalQuotes}))
    }
}

export const { initState, setLoadingState, changePage, addMoreQuotes } = quotesSlice.actions;
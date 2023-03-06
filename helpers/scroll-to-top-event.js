
const isBrowser = () => typeof window !== 'undefined'; // make sure it's a browser

export const scrollToTop = () => {
    if (!isBrowser()) return; // it will not work if we access this page through a different environment than a browser
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
    //window.location.href = '/'; /* passive return to index */
};

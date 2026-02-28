export const booksUrl = "/books";
export const bookByIdUrl = (id: number) => `/books/${id}`;
export const filterElasticUrl = "/filter/elastic";
export const mostBorrowedBooksUrl = "/books/most-borrowed";
export const trendingBooksUrl = "/books/trending";
export const newArrivalBooksUrl = "/books/new-arrivals";
export const recommendBooksUrl = (userId: number) =>
  `/books/recommend/${userId}`;
export const suggestElasticUrl = "/suggest/elastic";
export const genresDisplayUrl = "/genres/display";
export const digitalBookUrl = (isbn: string) => `/digitals/preview/${isbn}`;
export const languagesElasticUrl = "/languages/elastic";
export const instantSearchUrl = "/search/instant";

export const userUrl = "/users";
export const userByIdUrl = (id: number) => `/users/${id}`;
export const historySearchUrl = "/history-searches";
export const historySearchFullUrl = (userId: number) =>
  `/history-searches/full/${userId}`;
export const historySearchRecentUrl = "/history-searches/recent";
export const historySearchMergeUrl = "/history-searches/merge";
export const historySearchByIdUrl = (id: number) => `/history-searches/${id}`;

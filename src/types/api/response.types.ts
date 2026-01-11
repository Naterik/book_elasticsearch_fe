export interface IBackendRes<T> {
  error?: string;
  message?: string;
  data: T;
}

export interface IModelPaginate<T> {
  pagination: IPagination;
  result: T[];
}

export interface IPagination {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
}

export interface IHistorySearch {
  id: number;
  term: string;
}

export interface ISuggestElastic {
  data: ISuggest[];
}

export type ISuggestResult = ISuggest[];

export interface ISuggest {
  text: string;
}

export interface IAggregations {
  key: string;
  doc_count: number;
}

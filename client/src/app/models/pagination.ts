// use to create type for Pagination Metada
export interface Metada {
  currentPage: number;
  totalPage: number;
  pageSize: number;
  totalCount: number;
}

// create generic class for paginated respose
export class PagenatedResponse<T> {
  items: T;
  metaData: Metada;

  constructor(items: T, metaData: Metada) {
    this.items = items;
    this.metaData = metaData;
  }
}

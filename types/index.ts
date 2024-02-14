export {};

type TStatus = "success" | "loading" | "error" | "";

declare global {
  interface IMovie {
    countries: {
      country: string;
    }[];
    genres: {
      genre: string;
    }[];
    description?:string;
    imdbId: string;
    kinopoiskId: number;
    nameEn: string | null;
    nameOriginal: string;
    nameRu: string;
    posterUrl: string;
    posterUrlPreview: string;
    ratingImdb: number;
    ratingKinopoisk: number;
    type: string;
    year: number;
  }

  interface IFormData {
    keyword: string;
    yearFrom: string;
    yearTo: string;
    ratingFrom: string;
    ratingTo: string;
    order: string;
    genres: string;
    countries: string;
    type: string;
  }

  interface ISelectItem {
    id: number | string;
    option: string;
    selected: boolean;
    hidden?: boolean;
  }

  interface IPaginationItem {
    page: number;
    selected: boolean;
  }

  interface IFilters {
    genres: ISelectItem[];
    countries: ISelectItem[];
    orders: ISelectItem[];
    types: ISelectItem[];
  }

  export interface IMovieInfo {
    status: TStatus;
    movies: IMovie[];
  }

  interface IFilterSearch {
    status: TStatus;
    filters: IFilters;
  }

  interface IMovieSearch {
    status: TStatus;
    movies: IMovie[];
    pages: IPaginationItem[];
  }
}

import { defineStore } from "pinia";
import axios from "axios";

const url = `https://kinopoiskapiunofficial.tech/api/v2.2/films`;

export const useFiltersStore = defineStore("filtersStore", {
  state: (): IFilterSearch => ({
    status: "",
    filters: {
      genres: [],
      countries: [],
      types: [
        {
          id: "TV_SHOW",
          option: "ТВ Шоу",
          selected: false,
          hidden: false,
        },
        {
          id: "FILM",
          option: "Фильм",
          selected: false,
          hidden: false,
        },
        {
          id: "TV_SERIES",
          option: "Сериал",
          selected: false,
          hidden: false,
        },
        {
          id: "MINI_SERIES",
          option: "Мини-сеарил",
          selected: false,
          hidden: false,
        },
      ],
      orders: [
        {
          id: "RATING",
          option: "По рейтингу",
          selected: false,
          hidden: false,
        },

        {
          id: "NUM_VOTE",
          option: "По названию",
          selected: false,
          hidden: false,
        },

        {
          id: "YEAR",
          option: "По дате",
          selected: false,
          hidden: false,
        },
      ],
    },
  }),
  actions: {
    async getFilters() {
      this.status = "loading";
      try {
        const { data } = await axios.get(`${url}/filters`, {
          headers: {
            "X-API-KEY": "ef146b16-7614-471e-8273-a384301ea047",
            "Content-Type": "application/json",
          },
        });
        this.status = "success";
        this.filters.genres = JSON.parse(
          JSON.stringify(data.genres).replaceAll('"genre"', '"option"')
        );
        this.filters.countries = JSON.parse(
          JSON.stringify(data.countries).replaceAll('"country"', '"option"')
        );
      } catch (error) {
        this.status = "error";
        console.error("Error fetching filters:", error);
      }
    },
  },
});

export const useSearchStore = defineStore("searchStore", {
  state: (): IMovieSearch => ({
    status: "",
    movies: [],
    pages: [],
  }),

  actions: {
    async getMovies(queryString: string, currentPage: number) {
      this.status = "loading";
      try {
        const { data } = await axios.get(`${url}?${queryString}`, {
          headers: {
            "X-API-KEY": "ef146b16-7614-471e-8273-a384301ea047",
            "Content-Type": "application/json",
          },
        });
        this.status = "success";
        this.pages = Array.from({ length: data.totalPages }, (_, index) => ({
          page: index + 1,
          selected: index + 1 === currentPage,
        }));
        this.movies = data.items;
      } catch (error) {
        this.status = "error";
        console.error("Error fetching filters:", error);
      }
    },
  },
});

export const useMovieInfo = defineStore("movieInfo", {
  state: (): IMovieInfo => ({
    status: "",
    movies: [],
  }),

  actions: {
    async getMovieInfo(movieId: number) {
      this.status = "loading";
      try {
        const { data } = await axios.get(`${url}/${movieId}`, {
          headers: {
            "X-API-KEY": "ef146b16-7614-471e-8273-a384301ea047",
            "Content-Type": "application/json",
          },
        });
        this.status = "success";
        this.movies.push(data);
        console.log('данные загружены');
        
      } catch (error) {
        this.status = "error";
        console.error("Error fetching filters:", error);
      }
    },
  },
});

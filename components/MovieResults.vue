<template>
  <div class="movie-results">
    <AppTogglerViewMode v-if="pages.length" @getModeValue="setMode" />

    <div :class="['movie-results__container', { 'movie-results__container--tile': tileMode !== true }]">
      <TheMovieCard v-for="(movie) of movies" :key="movie.kinopoiskId" :isTile="tileMode" :movie="movie"
        @openModal="openModal(movie.kinopoiskId)" />
    </div>

    <AppPagination v-if="pages.length > 1" :pages="pages" @getPage="getPage" />
    <Teleport to="body">
      <Modal :modalOpened="modalOpened" :info="infoMovie" @closeModal="closeModal" />
    </Teleport>
  </div>
</template>

<script lang="ts" setup>
import { useMovieInfo } from '~/stores/';
const movieInfo = useMovieInfo()

const props = defineProps({
  movies: {
    required: true,
    type: Array as PropType<IMovie[]>
  },
  pages: {
    required: true,
    type: Array as PropType<IPaginationItem[]>
  }
})

const { openCloseModal } = useUtils()
const emit = defineEmits(['getPage'])
const tileMode = ref<boolean>(true)
const modalOpened = ref<boolean>(false)
const infoMovie = ref<IMovie>()

function getPage(selectedPage: number): void {
  emit('getPage', selectedPage)
}

function setMode(value: boolean): void {
  tileMode.value = value
}

async function openModal(movieId: number) {
  let movie = movieInfo.movies.find(movie => movie.kinopoiskId === movieId);

  if (!movie) {
    await movieInfo.getMovieInfo(movieId);
    movie = movieInfo.movies.find(movie => movie.kinopoiskId === movieId);
  }

  if (movie) {
    modalOpened.value = openCloseModal(modalOpened.value);
    infoMovie.value = movie
  }
}

function closeModal() {
  modalOpened.value = openCloseModal(modalOpened.value);
}
</script>

<style lang="scss" scoped>
.movie-results {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;

  &__container {
    flex: 1;
    position: relative;
    width: 100%;
    height: 100%;
    color: #FFFFFF;
    overflow: auto;
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-right: 8px;

    &::-webkit-scrollbar {
      background-color: transparent;
      width: 14px;

      &-thumb {
        width: 4px;
        border-radius: 2px;
        background-color: #FFFFFF14;
      }
    }

    &--tile {
      flex-direction: row;
      flex-wrap: wrap;
    }
  }
}
</style>
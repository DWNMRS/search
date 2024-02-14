<template>
  <div :class="['movie-card', { 'movie-card--tile': isTile !== true }]" @click="openModal">
    <div class="movie-card__img-wrapper">
      <img class="movie-card__img" :src="movie.posterUrlPreview" :alt="movie.nameRu" />
    </div>
    <div class='movie-card__info'>
      <h2 class="movie-card__info-name">
        {{ movie.nameRu ? movie.nameRu : 'Без названия' }}
      </h2>
      <div class="movie-card__info-basic">
        <span class="movie-card__info-basic__item">
          {{ movie.year }}
        </span>
        <div class="movie-card__info-basic__item">
          <span class="movie-card__info-basic__item-country" v-for="(country, index) in movie.countries" :key="index">
            {{ country.country }}
          </span>
        </div>
        <span class="movie-card__info-basic__item" v-if="movie.type === 'FILM'">Фильм</span>
        <span class="movie-card__info-basic__item" v-if="movie.type === 'SERIAL'">Сериал</span>
      </div>
      <div class="movie-card__info-basic">
        <div class="movie-card__info-basic__item">
          <span class="movie-card__info-basic__item-country" v-for="(genre, index) in movie.genres" :key="index">
            {{ genre.genre }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts"  setup >

const emit = defineEmits(['openModal'])


const props = defineProps({
  movie: {
    required: true,
    type: Object as PropType<IMovie>,
    default: () => { }
  },
  isTile: {
    required: false,
    type: Boolean,
    default: false,
  }
})

function openModal() {
  emit('openModal')
}
// function openModal(movieId: number) {
//   if (!movieInfo.movies.map(movie => movie.kinopoiskId).includes(movieId)) {
//     movieInfo.getMovieInfo(movieId);
//   }
//   modalOpened.value = openCloseModal(modalOpened.value);
// }

</script>

<style lang="scss" scoped>
.movie-card {
  width: 100%;
  height: 240px;
  padding: 8px;
  display: flex;
  background-color: #1F1F1F;
  border-radius: 4px;
  border: 2px solid transparent;
  transition: border 0.2s;

  &:hover {
    border: 2px solid #3F3F3F;
  }

  &__img {
    display: block;
    width: 136px;
    height: 204px;
    border-radius: 4px;
    object-fit: cover;

    &-wrapper {
      position: relative;
      margin-right: 24px;
      width: 136px;
      height: 204px;
      box-shadow: 0px 15px 30px 0px rgba(0, 0, 0, 0.2);
    }
  }

  &__info {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    &-name {
      font-size: 24px;
      margin-bottom: 16px;
      width: fit-content;
      border-bottom: 1px solid transparent;
      cursor: pointer;
      transition: 0.2s;
    }

    &-basic {
      display: flex;
      color: silver;
      flex-wrap: wrap;
      gap: 16px;

      &__item {
        font-weight: 300;
        font-size: 16px;

        &-country {
          &+& {
            &::before {
              content: " / ";
            }
          }
        }
      }

      &+& {
        margin-top: 16px;
      }
    }

    &-description {
      max-height: 280px;
      height: 100%;
      overflow: auto;
      padding-right: 24px;
      margin-top: 24px;
      transition: height 2s;

      &+* {
        margin-top: 24px;
      }

      &::-webkit-scrollbar {
        background-color: transparent;
        border-radius: 4px;
        width: 4px;

        &-thumb {
          width: 2px;
          border-radius: 2px;
          background-color: #FFFFFF14;
        }
      }
    }
  }

  &--tile {
    width: calc((100% / 4) - 6px);
    height: auto;
    padding: 4px;
    border: 2px solid transparent;

    &:hover {
      background-color: #3F3F3F;
      border: 2px solid transparent;
    }

    .movie-card {
      &__img {
        display: block;
        width: 100%;
        height: 100%;
        border-radius: 6px;
        object-fit: cover;

        &-wrapper {
          position: relative;
          width: 100%;
          height: auto;
          margin-right: 0;
        }
      }

      &__info {
        display: none;
      }
    }
  }
}
</style>
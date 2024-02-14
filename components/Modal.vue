<template>
  <div v-if="modalOpened" class="modal" @click="closeModal">
    <div class="modal-content" @click.stop>
      <button class="modal-content__button" @click="closeModal">
        <IconCross class="modal-content__button-icon" />
      </button>
      <div class="modal-content__img-wrapper">
        <img class="modal-content__img" :src="info.posterUrlPreview" :alt="info.nameRu" />
      </div>
      <div class='modal-content__info'>
        <h2 class="modal-content__info-name">
          {{ info.nameRu ? info.nameRu : 'Без названия' }}
        </h2>
        <div class="modal-content__info-basic">
          <span class="modal-content__info-basic__item">
            {{ info.year }}
          </span>
          <div class="modal-content__info-basic__item">
            <span class="modal-content__info-basic__item-country" v-for="(country, index) in info.countries" :key="index">
              {{ country.country }}
            </span>
          </div>
          <span class="modal-content__info-basic__item" v-if="info.type === 'FILM'">Фильм</span>
          <span class="modal-content__info-basic__item" v-if="info.type === 'SERIAL'">Сериал</span>
        </div>
        <div class="modal-content__info-basic">
          <div class="modal-content__info-basic__item">
            <span class="modal-content__info-basic__item-country" v-for="(genre, index) in info.genres" :key="index">
              {{ genre.genre }}
            </span>
          </div>
        </div>
        <p class="modal-content__info-description">
          {{ info.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  info: {
    required: false,
    type: Object as PropType<IMovie>,
    default: () => { }
  },
  modalOpened: {
    required: true,
    type: Boolean
  }
})
const emit = defineEmits(['closeModal'])
function closeModal() {
  emit('closeModal')
}


</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  color: #FFFFFF;
  background-color: #000000cc;

  &-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    padding: 16px;
    border-radius: 8px;
    background-color: #1F1F1F;
    z-index: 150;
    width: 800px;
    max-height: 544px;

    &__button {
      position: absolute;
      right: 16px;
      top: 16px;
      width: 24px;
      height: 24px;
      padding: 0;
      color: #6F6F6F;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: 0.2s;

      &:hover {
        color: #3F3F3F;
      }

      &-icon {
        width: 100%;
        height: 100%;
      }
    }

    &__img {
      display: block;
      width: 100%;
      height: 100%;
      border-radius: 6px;
      object-fit: cover;

      &-wrapper {
        margin-right: 24px;
        height: 512px;
        min-width: 360px;
        box-shadow: 0px 15px 30px 0px rgba(0, 0, 0, 0.2);
        margin-right: 32px;
      }
    }

    &__info {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      height: inherit;

      &-name {
        font-size: 24px;
        margin-bottom: 16px;
        width: fit-content;
        border-bottom: 1px solid transparent;
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
  }
}
</style>
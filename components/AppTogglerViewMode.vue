<template>
  <div class="toggler">
    <div class=" toggler__wrapper">
      <label class="toggler__label">
        <input class="toggler__input" v-model="isChecked" type="checkbox" @click="toggleMode" />
        <div class="toggler__slider">
          <IconSimple :class="['toggler__slider-icon', { 'toggler__slider-icon--active': !isChecked }]" />
          <IconTile :class="['toggler__slider-icon', { 'toggler__slider-icon--active': isChecked }]" />
        </div>
      </label>
    </div>
  </div>
</template>

<script lang="ts" setup>

const isChecked = ref<boolean>(false)
const emit = defineEmits(['getModeValue'])

function toggleMode() {
  emit('getModeValue', isChecked.value)
}

</script>

<style lang="scss" scoped>
.toggler {
  display: flex;
  align-items: center;
  justify-content: center;

  &__wrapper {
    display: flex;
    align-items: center;
  }


  &__input {
    display: none;
  }

  &__slider {
    position: relative;
    background-color: #3F3F3F;
    width: 64px;
    height: 32px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &-icon {
      position: relative;
      width: 32px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #2F2F2F;
      z-index: 50;
      transition: 0.2s;

      &--active {
        color: #9f9f9f;
      }
    }

    &::after {
      content: "";
      display: block;
      position: absolute;
      top: 2px;
      left: 2px;
      width: 28px;
      height: 28px;
      background-color: #6f6f6f;
      border-radius: 4px;
      transition: left 0.2s ease-in-out;
    }
  }

  &__input:checked~&__slider {
    &::after {
      left: calc(100% - 30px);
    }
  }

}
</style>
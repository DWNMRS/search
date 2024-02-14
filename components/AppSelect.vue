<template>
  <div class="select">
    <input class="select__input" type="text" placeholder=" " :class="classes" v-model="inputValue" @click="toggleSelect"
      @input="handleInput()" />
    <span class="select__placeholder">{{ label }}</span>
    <div class="select__icon"></div>
    <div class="select__options">
      <AppSelectItem v-for="(item, i) in items" v-show="!item.hidden" :key="i" :item="item"
        @click="handleItemSelect(i, item)" />
    </div>
  </div>
</template>

<script setup lang="ts">

const props = defineProps({
  items: {
    required: true,
    type: Array as PropType<ISelectItem[]>
  },
  label: {
    required: true,
    type: String
  },
  identifier: {
    required: true,
    type: String
  }
})

const selectedItem = ref<ISelectItem>()
const isOpened = ref<boolean>(false)
const inputValue = ref<string>('')


const classes = computed(() => {
  return {
    'select__input--opened': isOpened.value === true,
    'select__input--overflow': props.items.length <= 4
  }
})
const emit = defineEmits(['getInputValue'])


const toggleSelect = (): void => {
  if (isOpened.value === false) {
    isOpened.value = true
  } else {
    closeItemOptions()
  }
}
function closeItemOptions() {
  isOpened.value = false
}

function isStringIncluded(stringToTest: string, stringToSearch: string) {
  return stringToTest.toLowerCase()
    .trim()
    .includes(
      stringToSearch
        .toLowerCase()
        .trim()
    )
}

function checkItemsOnMatch(): void {
  props.items.forEach((item) => {
    if (!inputValue.value) {
      item.hidden = false
    } else {
      const isItemMatched = isStringIncluded(item.option, inputValue.value)
      item.hidden = !isItemMatched
    }
  })
}

function checkIsInputCorrect(): void {
  if (
    !isOpened.value
    && selectedItem.value?.option
  ) {
    if (inputValue.value !== selectedItem.value?.option) {
      inputValue.value = selectedItem.value?.option
    }
  }
}

function handleInput(): void {
  checkItemsOnMatch()
  checkIsInputCorrect()
  if (!inputValue.value) {
    emit('getInputValue', '', props.identifier)
  } else {
    emit('getInputValue', selectedItem.value?.id, props.identifier)
  }
}

const handleItemSelect = (itemIndex: number, selectedOption: ISelectItem) => {
  props.items.forEach((item: ISelectItem) => {
    item.selected = false
  })
  props.items[itemIndex].selected = true
  selectedItem.value = selectedOption
  inputValue.value = selectedOption.option
  emit('getInputValue', selectedItem.value?.id, props.identifier)
  closeItemOptions()
}
</script>

<style scoped lang="scss">
.select {
  position: relative;
  width: 100%;
  height: 56px;
  border: 1px solid transparent;

  &__input {
    box-sizing: border-box;
    width: 100%;
    height: 56px;
    padding: 24px 18px 8px 0;
    color: #FFFFFF;
    border: 1px solid transparent;
    border-bottom: 2px solid #BAB9BD;
    background: none;
    outline: none;
    caret-color: #FFFFFF;
    font-size: 16px;
    cursor: pointer;
    transition: border 0.3s;

    &:hover {
      border-bottom: 2px solid #714DFF;
    }

    &--opened {
      border-bottom: 2px solid #714DFF;

      ~.select__icon::after {
        transform: rotate(-45deg);
      }

      ~.select__icon::before {
        transform: rotate(45deg);
      }

      ~.select__options {
        max-height: 242px;
        overflow: auto;
        z-index: 5;
        pointer-events: all;
      }
    }

    &--opened+.select__placeholder,
    &:not(:placeholder-shown)+.select__placeholder {
      top: 8px;
      font-weight: 600;
      transform: scale(0.8);
    }

    &--opened &--overflow~.select__options {
      overflow: hidden;
    }
  }

  &__icon {
    position: absolute;
    height: 7px;
    width: 13px;
    right: 0;
    top: 50%;

    &:after {
      position: absolute;
      content: " ";
      left: 0.5px;
      width: 8px;
      height: 2px;
      background: #714DFF;
      transition: all 0.3s ease 0s;
      transform: rotate(45deg);
    }

    &:before {
      position: absolute;
      content: " ";
      right: 0;
      width: 8px;
      height: 2px;
      background: #714DFF;
      transition: all 0.3s ease 0s;
      transform: rotate(-45deg);
    }
  }

  &__placeholder {
    position: absolute;
    color: #BAB9BD;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    transition: top 0.3s linear, left 0.3s linear, font-size 0.3s linear, font-weight 0.3s linear, transform 0.3s linear;
    transform-origin: 0 0;
    z-index: 1;
    pointer-events: none;
  }

  &__options {
    position: absolute;
    box-sizing: border-box;
    border-radius: 0 0 4px 4px;
    top: calc(100% + 2px);
    width: 100%;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.8s;
    z-index: 3;
    box-shadow: 0px 14px 25px rgba(0, 0, 0, 0.05);
    background-color: #1F1F1F;
    pointer-events: none;

    &::-webkit-scrollbar {
      background-color: #3f3f3f;
      width: 12px;

      &-thumb {
        background-color: #6F6F6F;

        &:hover {
          background-color: #8F8F8F;
        }
      }
    }
  }
}
</style>
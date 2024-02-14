<template>
  <div :class="['select__item', { 'select__item--selected': item.selected }]">
    {{ item.option }}
  </div>
</template>

<script  setup lang='ts'>

const props = defineProps({
  item: {
    required: true,
    type: Object as PropType<ISelectItem>
  }
})

</script>

<style scoped lang='scss'>
.select {
  &__item {
    display: flex;
    box-sizing: border-box;
    align-items: center;
    background-color: #3f3f3f;
    width: 100%;
    color: #DDDDDD;
    height: 56px;
    padding-left: 12px;
    cursor: pointer;

    &:hover {
      background-color: #6F6F6F;
    }

    &--selected {
      background-color: #8F8F8F;

      &:hover {
        background-color: #8F8F8F;
      }
    }
  }
}
</style>
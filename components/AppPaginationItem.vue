<template>
  <div :class="['pagination__item', { 'pagination__item--selected': pages.selected }]">
  </div>
</template>

<script lang="ts" setup>

const props = defineProps({
  pages: {
    required: true,
    type: Object as PropType<IPaginationItem>
  }
})

</script>

<style lang="scss" scoped>
.pagination {
  &__item {
    width: 10px;
    height: 10px;
    background-color: #fff;
    border-radius: 50%;
    cursor: pointer;

    &:hover {
      border: 1px solid #714DFF;
    }

    &--selected {
      background-color: #714DFF;
    }
  }
}
</style>
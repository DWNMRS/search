<template>
  <div class="pagination">
    <AppPaginationItem v-for="(page,index) of pages" :key="index" :pages="page" @click="selectPage(page)" />
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits(['getPage'])
const props = defineProps({
  pages: {
    required: true,
    type: Array as PropType<IPaginationItem[]>,
  },
})


const selectPage = (selectedPage: IPaginationItem) => {
  emit('getPage', selectedPage.page);
  
}
</script>

<style lang="scss" scoped>
.pagination {
  width: 100%;
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  background-color: transparent;
}
</style>

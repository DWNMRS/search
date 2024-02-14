<template>
  <div class="search-page">
    <MovieForm :filters="filtersStore.filters" @getQuerySrting="setQueryString" />
    <MovieResults :queryString="queryString" :movies="searchStore.movies" :pages="searchStore.pages" @getPage="setPage" />
  </div>
</template>

<script lang="ts" setup>

import { useFiltersStore, useSearchStore } from '~/stores/';
const filtersStore = useFiltersStore()
const searchStore = useSearchStore()
const queryString = ref<string>('')
const currentPage = ref<number>(1)

onMounted(() => {
  filtersStore.getFilters()
})

function setPage(selectedPage: number) {
  currentPage.value = selectedPage
  const updatedQueryString = queryString.value.replace(/&page=\d+/g, '') + `&page=${currentPage.value}`
  searchStore.getMovies(updatedQueryString, currentPage.value)
}
function setQueryString(query: string) {
  currentPage.value = 1
  queryString.value = query + `&page=${currentPage.value}`
  searchStore.getMovies(queryString.value, currentPage.value)
}

</script>

<style lang="scss" scoped>
.search-page {
  height: 100vh;
  width: 100%;
  background-color: #181818;
  padding: 8px;
  display: flex;
  gap: 8px;
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
}
</style>
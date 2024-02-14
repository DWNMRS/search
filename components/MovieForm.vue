<template>
  <form class="form" @submit.prevent="setQueryString(queryString)">
    <AppInput label="Ключевое слово" type="text" identifier="keyword" @getInputValue="setValueFormData" />

    <div class="form__section">
      <span class="form__section-title">Год</span>
      <div class="form__section-wrapper">
        <AppInput label="От" type="number" identifier="yearFrom" :maxLength="4" :minValue="1000" :maxValue="2999"
          @getInputValue="setValueFormData" />
        <AppInput label="До" type="number" identifier="yearTo" :maxLength="4" :minValue="1001" :maxValue="3000"
          @getInputValue="setValueFormData" />
      </div>
    </div>

    <div class="form__section">
      <span class="form__section-title">Рейтинг</span>
      <div class="form__section-wrapper">
        <AppInput label="От" type="number" identifier="ratingFrom" :maxLength="2" :minValue="0"  :maxValue="10" @getInputValue="setValueFormData" />
        <AppInput label="До" type="number" identifier="ratingTo" :maxLength="2" :minValue="1" :maxValue="10" @getInputValue="setValueFormData" />
      </div>
    </div>

    <AppSelect label="Сортировка" identifier="order" :items="filters.orders" @getInputValue="setValueFormData" />
    <AppSelect label="Страна" identifier="countries" :items="filters.countries" @getInputValue="setValueFormData" />
    <AppSelect label="Жанр" identifier="genres" :items="filters.genres" @getInputValue="setValueFormData" />
    <AppSelect label="Тип" identifier="type" :items="filters.types" @getInputValue="setValueFormData" />
    <button class="form__button">Поиск</button>
  </form>
</template>

<script lang="ts" setup>


const props = defineProps({
  filters: {
    required: true,
    type: Object as PropType<IFilters>
  },
})
const emit = defineEmits(['getQuerySrting'])

const formData = ref<IFormData>({
  keyword: '',
  yearFrom: '',
  yearTo: '',
  ratingFrom: '',
  ratingTo: '',
  order: '',
  genres: '',
  countries: '',
  type: '',
})

const queryString = computed(() => {
  let queryString = ''
  for (const key in formData.value) {
    if (formData.value[key as keyof IFormData]) {
      queryString += `${key}=${formData.value[key as keyof IFormData]}&`
    }
  }
  queryString = queryString.slice(0, -1)
  return queryString
})

function setValueFormData(inputValue: string, field: keyof IFormData,) {
  formData.value[field] = inputValue
}

function setQueryString(queryString: string) {
  emit('getQuerySrting', queryString)
}

</script>

<style lang="scss" scoped>
.form {
  background-color: #1F1F1F;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  width: 280px;
  border-radius: 4px;

  &__section {
    display: flex;
    flex-direction: column;
    gap: 8px;

    &-title {
      color: #bababa;
    }

    &-wrapper {
      display: flex;
      gap: 8px;
    }
  }

  &__button {
    background-color: #714DFF;
    color: #FFFFFF;
    padding: 16px;

  }
}
</style>
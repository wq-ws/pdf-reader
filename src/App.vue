<script setup lang="ts">
import { ref } from 'vue'
import pdf from "./components/pdf.vue";

type ColumnType = Array<{ key: string, title: string }>

const showData = ref<any>([])
const column = ref<ColumnType>([])
const updatePdf = (data: any) => {
  showData.value = data.map((item, index) => {
    return {
      ...item,
      key: index
    }
  })
  column.value = Object.keys(data[0]).map(item => ({ key: item, title: item }))
  console.log(column.value, showData.value);
}
</script>

<template>
  <n-notification-provider>
    <pdf @update="updatePdf" />
  </n-notification-provider>
  <n-data-table :columns="column" :data="showData" />
</template>

<style scoped></style>

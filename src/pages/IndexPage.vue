<template>
  <q-page class="row justify-center">
    Dashboard
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { appApi } from '@/api/appApi'
import { Product } from '@/interfaces/product.interface'

const loading = ref(false)
const products = ref<Product[]>([])

const getProducts = async () => {
  loading.value = true
  try {
    let response = await appApi.get("/products")
    products.value = response.data
  } catch (error) {
    // openSnackbar('An error occurred while loading the products.', 'error')
  }
  loading.value = false
}

getProducts()

</script>

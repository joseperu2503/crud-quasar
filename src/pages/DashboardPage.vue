<template>
  <q-page class="max-w-6xl mx-auto py-16 w-11/12">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-fit mx-auto">
      <q-card class="w-full max-w-[300px]" v-for="(product, index) in products" :key="index">
        <q-img :src="product.images[0]" height="300" class="cursor-pointer" @click="editProduct(product.id)" />
        <q-card-section>
          <div class="text-gray-600 font-semibold text-md cursor-pointer hover:underline truncate"
            @click="editProduct(product.id)">
            {{ product.name }}
          </div>
        </q-card-section>
      </q-card>
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="primary" @click="newProduct" />
    </q-page-sticky>
    <ProductForm v-model:showModal="showModal" :productId="productId" @reloadData="getProducts" />
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { appApi } from '@/api/appApi'
import { Product } from '@/interfaces/product.interface'
import ProductForm from '@/components/ProductForm.vue';

const products = ref<Product[]>([])

const showModal = ref(false)
const loading = ref(false)
const productId = ref<number | null>(null)

const newProduct = () => {
  productId.value = null
  showModal.value = true
}

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

const editProduct = (id: number) => {
  productId.value = id
  showModal.value = true
}

// const { openSnackbar } = useSnackbar()

getProducts()

</script>

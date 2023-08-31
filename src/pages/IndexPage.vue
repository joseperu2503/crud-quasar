<template>
  <q-page class="">
    <div class="row">
      <div v-for="(product, index) in products" :key="index" class="col-12 col-sm-4 col-md-3">
        <q-card class="w-full">
          <img :src="product.images[0]">
          <q-card-section>
            <div class="text-h6" @click="editProduct(product.id)">{{ product.name }}</div>
          </q-card-section>
        </q-card>
      </div>
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
<style scoped>
.q-page {
  max-width: 1000px;
  width: 95%;
  margin: 0 auto;
  padding: 60px 0;
}
</style>

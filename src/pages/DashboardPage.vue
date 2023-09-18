<template>
  <q-page class="max-w-6xl mx-auto py-16 w-11/12">

    <div class="flex justify-between">
      <div class="text-h6">My products</div>
      <q-btn :icon="isGridView ? 'grid_view' : 'toc'" flat round @click="isGridView = !isGridView" />
    </div>
    <template v-if="!isGridView">
      <q-btn color="primary" icon="add" no-caps @click="newProduct" class="mt-4 mb-8">Create product</q-btn>
      <q-table :rows="products" row-key="id" :loading="loading" hide-pagination flat
        :rows-per-page-options="[products.length]">
        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th>ID</q-th>
            <q-th>Name</q-th>
            <q-th>Price</q-th>
            <q-th>Stock</q-th>
            <q-th>Date</q-th>
            <q-th>Actions</q-th>
          </q-tr>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-th> {{ props.row.id }}</q-th>
            <q-th> {{ props.row.name }}</q-th>
            <q-th> {{ props.row.price }}</q-th>
            <q-th> {{ props.row.stock }}</q-th>
            <q-th> {{ props.row.created_at }}</q-th>
            <q-th> </q-th>
          </q-tr>
        </template>
      </q-table>
    </template>
    <template v-else>
      <div class="flex justify-center mt-6">
        <q-pagination v-model="pagination.currentPage" :max="pagination.totalPages" boundary-numbers :max-pages="6"
          @update:modelValue="getProducts" direction-links />
      </div>
      <div class="grid-products justify-center gap-4 mt-8">
        <q-card class="w-full " v-for="(product, index) in products" :key="index">
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
    </template>

    <div class="flex justify-center mt-6">
      <q-pagination v-model="pagination.currentPage" :max="pagination.totalPages" boundary-numbers :max-pages="6"
        @update:modelValue="getProducts" direction-links />
    </div>
    <ProductForm v-model:showModal="showModal" :productId="productId" @reloadData="getProducts" />

  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { appApi } from '@/api/appApi'
import { Product } from '@/interfaces/product.interface'
import ProductForm from '@/components/ProductForm.vue';
import { ResponsePaginate } from '@/interfaces/responsePaginate.interface';

const products = ref<Product[]>([])
const showModal = ref(false)
const loading = ref(false)
const productId = ref<number | null>(null)
const pagination = ref({
  currentPage: 1,
  totalPages: 10,
})
const newProduct = () => {
  productId.value = null
  showModal.value = true
}

const getProducts = async () => {
  loading.value = true
  try {
    const response = await appApi.get<ResponsePaginate<Product>>("/my-products", {
      params: {
        page: pagination.value.currentPage
      }
    })
    const myProductsResponse = response.data
    products.value = myProductsResponse.data
    pagination.value = {
      currentPage: myProductsResponse.meta.current_page,
      totalPages: myProductsResponse.meta.last_page
    }
  } catch (error) {
  }
  loading.value = false
}

const editProduct = (id: number) => {
  productId.value = id
  showModal.value = true
}

const isGridView = ref(false)

getProducts()

</script>
<style>
.grid-products {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 300px));
}
</style>


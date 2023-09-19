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
          <q-tr :props="props" class="text-left">
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
            <q-td> {{ props.row.id }}</q-td>
            <q-td> {{ props.row.name }}</q-td>
            <q-td> {{ props.row.price }}</q-td>
            <q-td> {{ props.row.stock }}</q-td>
            <q-td> {{ props.row.created_at }}</q-td>
            <q-td> <q-btn color="primary" icon="more_vert" round flat>
                <q-menu>
                  <q-list style="min-width: 100px">
                    <q-item clickable v-close-popup>
                      <q-item-section @click="editProduct(props.row.id)">Edit</q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup>
                      <q-item-section @click="onDeleteProduct(props.row.id)">Delete</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn></q-td>
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
        <ProductCard :product="product" v-for="product in products" :key="product.id" @edit="editProduct(product.id)" />
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
import { Product } from '@/interfaces/product.interface'
import ProductForm from '@/components/ProductForm.vue';
import { useProduct } from '@/composables/useProduct';
import ProductCard from '@/components/ProductCard.vue';

const $useProduct = useProduct()
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
    const myProductsResponse = await $useProduct.getProducts(pagination.value.currentPage)
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

const onDeleteProduct = async (id: number) => {
  loading.value = true
  try {
    await $useProduct.deleteProduct(id)
    getProducts()
  } catch (error: any) {
  }
  loading.value = false
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


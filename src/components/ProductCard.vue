<template>
  <q-card class="w-full ">
    <q-img :src="product.images[0]" height="250px" class="cursor-pointer" @click="editProduct()" fit="contain"
      v-if="product.images[0]">
      <template v-slot:error>
        <q-img src="/no-image.jpg" height="250px" />
      </template>
    </q-img>
    <q-img src="/no-image.jpg" height="250px" @click="editProduct()" v-else />
    <q-card-section>
      <div class="text-gray-600 font-semibold text-lg cursor-pointer hover:underline truncate" @click="editProduct()">
        {{ product.name }}
      </div>
    </q-card-section>
    <q-card-section class="pt-0 ">
      <span class="line-clamp-2"> {{ product.description }}</span>
    </q-card-section>
    <q-separator class="mb-2"></q-separator>
    <q-card-section class="q-pt-none">
      <div class="flex flex-grow">
        <q-chip icon="sell" v-if="product.brand" size="sm">{{ product.brand.name }}</q-chip>
        <q-chip icon="category" v-if="product.category" size="sm">{{ product.category.name }}</q-chip>
      </div>
      <div class="flex flex-grow gap-1 mt-4">
        <div :style="{ background: color }" v-for="(color, index) in product.colors" :key="index"
          class="w-4 h-4 rounded-full">
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { Product } from '@/interfaces/product.interface';
defineProps<{ product: Product }>()
const emit = defineEmits(['edit']);

const editProduct = () => {
  emit('edit')
}
</script>

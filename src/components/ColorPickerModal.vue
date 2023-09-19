<template>
  <q-dialog :modelValue="modelValue" @hide="closeModal">
    <q-card style="width: 100%; max-width: 400px;">
      <q-card-section>
        <div class="text-h6">Add color</div>
      </q-card-section>
      <q-card-section>
        <q-color v-model="colorPicker" class="mx-auto" no-footer no-header-tabs />
      </q-card-section>
      <q-card-actions align="right">
        <div>
          <q-btn flat label="Cancel" color="primary" v-close-popup class="mr-2" />
          <q-btn label="Add" color="primary" @click="submit" />
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const colorPicker = ref('#000000')

defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue', 'addColor']);

const closeModal = () => {
  emit('update:modelValue', false)
}

const submit = () => {
  closeModal()
  emit('addColor', colorPicker.value)
}
</script>

<style scoped></style>

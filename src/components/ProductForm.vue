<template>
  <q-dialog :modelValue="showModal" @show="openModal" @hide="closeModal">
    <q-card style="width: 100%; max-width: 400px;">
      <q-card-section>
        <div class="text-h6">{{ title }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-form @keydown.enter="submit" class="q-gutter-sm">
          <q-input v-model="form.name" label="Name" :error="!!errors.name" :error-message="errors.name?.[0]"
            ref="nameInput" />

          <q-input v-model="form.price" label="Price" :error="!!errors.price" :error-message="errors.price?.[0]"
            type="number">
            <template v-slot:prepend>
              <q-icon name="attach_money" />
            </template>
          </q-input>
          <q-input v-model="form.stock" label="Stock" :error="!!errors.stock" :error-message="errors.stock?.[0]"
            type="number" />

          <q-file multiple accept="image/png, image/jpeg" v-model="images" label="Images" :error="!!errors.images"
            :error-message="errors.images?.[0]">
            <template v-slot:prepend>
              <q-icon name="attach_file" />
            </template>
          </q-file>
          <q-btn color="primary" icon="add_a_photo" label="Take a photo" @click="TakePhoto"
            v-if="$q.platform.is.nativeMobile" outline rounded />
        </q-form>
        <q-carousel animated v-model="slide" arrows navigation infinite v-if="form.images.length > 0" height="300px"
          control-type="push" control-text-color="grey-7" swipeable transition-prev="slide-right"
          transition-next="slide-left">
          <q-carousel-slide :name="index + 1" v-for="(image, index) in form.images" :key="index">
            <q-img :src="image" style="height: 100%" fit="contain" />
          </q-carousel-slide>
        </q-carousel>
      </q-card-section>

      <q-card-actions align="between">
        <q-btn outline color="red" icon="delete" v-if="productId" @click="deleteProduct(productId)" />
        <div v-else></div>
        <div>
          <q-btn flat label="Cancel" color="primary" v-close-popup class="mr-2" />
          <q-btn label="Save" color="primary" @click="submit" />
        </div>
      </q-card-actions>
      <q-inner-loading :showing="loading" label="Please wait..." label-class="text-primary"
        label-style="font-size: 1.1em" />
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { appApi } from '@/api/appApi'
import { ProductForm, ProductErrors } from '@/interfaces/product.interface'
import { useUploadImage } from '@/composables/useUploadImage';
import { useQuasar } from 'quasar'
import { Camera, CameraDirection, CameraResultType, CameraSource } from '@capacitor/camera';
import { Keyboard } from '@capacitor/keyboard';

const props = defineProps(['showModal', 'productId']);
const emit = defineEmits(['update:showModal', 'reloadData']);
const form = ref<ProductForm>({
  name: '',
  price: null,
  stock: null,
  images: []
})
const errors = ref<ProductErrors>({});
const submitMethod = ref('')
const urlMethod = ref('')
const loading = ref(false)
const images = ref<File[]>([])
const title = ref('')
const slide = ref(1)
const nameInput = ref<HTMLInputElement | null>(null)

const initForm = () => {
  form.value = {
    name: '',
    price: null,
    stock: null,
    images: []
  }
  errors.value = {}
  images.value = []
}

const openModal = () => {
  initForm()
  loadProduct()
}

const closeModal = () => {
  emit('update:showModal', false)
}

const { uploadImages } = useUploadImage()

watch(images, async (newValue) => {
  if (newValue.length != 0) {
    loading.value = true
    try {
      let response = await uploadImages(newValue)
      response.images.map(image => {
        form.value.images?.push(image.full_url_image)
      })
      images.value = []
      $q.notify({ type: 'positive', message: response.message })
    } catch (error) {
      $q.notify({ type: 'negative', message: 'An error occurred while uploading images.' })
      images.value = []
    }
    loading.value = false
  }
})

const loadProduct = async () => {
  loading.value = true
  if (props.productId) {
    title.value = 'Edit Product'
    submitMethod.value = 'put'
    urlMethod.value = `/products/${props.productId}`
    let response = await appApi.get(`/products/${props.productId}`)
    form.value = response.data
  } else {
    title.value = 'New Product'
    submitMethod.value = 'post'
    urlMethod.value = `/products`
    nameInput.value?.focus()
  }
  loading.value = false
}

const $q = useQuasar()

const submit = async () => {
  loading.value = true
  Keyboard.hide()
  try {
    let response = await appApi({
      method: submitMethod.value,
      url: urlMethod.value,
      data: form.value
    })
    emit('reloadData')
    $q.notify({ type: 'positive', message: response.data.message })
    closeModal()
  } catch (error: any) {
    if (error.response?.status === 422) {
      errors.value = error.response.data.errors;
    } else {
      $q.notify({ type: 'negative', message: 'An error occurred. Please try again.' })
    }
  }
  loading.value = false
}

const deleteProduct = async (id: number) => {
  loading.value = true
  try {
    let response = await appApi.delete(`/products/${id}`)
    $q.notify({ type: 'positive', message: response.data.message })
    emit('reloadData')
    closeModal()
  } catch (error: any) {
    $q.notify({ type: 'negative', message: 'An error occurred. Please try again.' })
  }
  loading.value = false
}

const TakePhoto = async () => {
  try {
    const photo = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      direction: CameraDirection.Rear,
      source: CameraSource.Camera
    })

    if (photo && photo.webPath) {
      const response = await fetch(photo.webPath);
      const blob = await response.blob();

      const file = new File([blob], 'photo.jpg', { type: 'image/jpeg' });

      images.value = [file]
    }
  } catch (error) {

  }
}

</script>


<style scoped></style>

<template>
  <q-dialog :modelValue="showModal" @show="openModal" @hide="closeModal">
    <q-card style="width: 100%; max-width: 1200px;">
      <q-card-section>
        <div class="text-h6">{{ title }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none ">
        <q-form @keydown.enter="submit" class="q-gutter-sm grid grid-cols-1 sm:grid-cols-2 gap-10">
          <div>
            <q-input v-model="form.name" label="Name*" :error="!!errors.name" :error-message="errors.name?.[0]"
              ref="nameInput" />
            <q-input v-model="form.description" type="textarea" label="Description*"
              :error-message="errors.description?.[0]" :error="!!errors.description" autogrow row />

            <q-select v-model="form.brand_id" :options="brands" label="Brand" option-value="id" option-label="name"
              :error-message="errors.brand_id?.[0]" :error="!!errors.brand_id" emit-value map-options />
            <q-input v-model="form.price" label="Price*" :error="!!errors.price" :error-message="errors.price?.[0]"
              type="number">
              <template v-slot:prepend>
                <q-icon name="attach_money" />
              </template>
            </q-input>
            <q-input v-model="form.stock" label="Stock*" :error="!!errors.stock" :error-message="errors.stock?.[0]"
              type="number" />
            <q-select v-model="form.category_id" :options="categories" label="Category" option-value="id"
              option-label="name" :error-message="errors.category_id?.[0]" :error="!!errors.category_id" emit-value
              map-options />

            <q-select v-model="form.genders" :options="genders" label="Genders" option-value="id" option-label="name"
              :error-message="errors.genders?.[0]" :error="!!errors.genders" emit-value map-options multiple />
            <q-select v-model="form.sizes" :options="sizes" label="Sizes" option-value="id" option-label="name"
              :error-message="errors.sizes?.[0]" :error="!!errors.sizes" emit-value map-options multiple />
          </div>
          <div>
            <div class="text-h6 mb-4 font-base">Colors</div>
            <div class="flex flex-grow gap-3 mb-8">
              <q-btn round :style="{ background: color }" v-for="(color, index) in form.colors" :key="index">
                <q-popup-proxy>
                  <q-banner inline-actions>
                    <span>{{ color }}</span>
                    <template v-slot:action>
                      <q-btn flat color="grey-9" icon="delete" round @click="removeColor(index)" />
                    </template>
                  </q-banner>
                </q-popup-proxy>
              </q-btn>
              <q-btn color="primary" icon="add" round @click="openColorPickModal">
                <q-tooltip>
                  Add Color
                </q-tooltip>
              </q-btn>
            </div>
            <q-separator />
            <div class="text-h6 my-4 font-base">Images</div>
            <q-file multiple accept="image/png, image/jpeg" v-model="images" label="Images" :error="!!errors.images"
              :error-message="errors.images?.[0]" ref="imageInput" class="hidden">
            </q-file>
            <div class="flex flex-grow gap-3">
              <q-btn color="primary" icon="add_photo_alternate" label="Upload image" @click="clickAddImage" outline
                rounded no-caps />
              <q-btn v-if="$q.platform.is.nativeMobile" color="primary" icon="add_a_photo" label="Take a photo"
                @click="TakePhoto" outline rounded no-caps />
            </div>
            <q-carousel animated v-model="slide" arrows navigation infinite v-if="form.images.length > 0" height="300px"
              control-type="push" control-text-color="grey-7" swipeable transition-prev="slide-right"
              transition-next="slide-left">
              <q-carousel-slide :name="index + 1" v-for="(image, index) in form.images" :key="index">
                <q-img :src="image" style="height: 100%" fit="contain" />
                <div class="absolute top-0 right-0">
                  <q-btn flat color="grey-9" icon="delete" round @click="removeImage(index)" />
                </div>
              </q-carousel-slide>
            </q-carousel>
            <q-separator class="mt-4" />
            <q-toggle v-model="form.free_shipping" label="Free shipping" />
          </div>
        </q-form>
      </q-card-section>

      <q-card-actions :align="productId ? 'between' : 'right'">
        <q-btn outline color="red" icon="delete" v-if="productId" @click="onDelete(productId)" />
        <div>
          <q-btn flat label="Cancel" color="primary" v-close-popup class="mr-2" />
          <q-btn label="Save" color="primary" @click="submit" />
        </div>
      </q-card-actions>
      <q-inner-loading :showing="loading" label="Please wait..." label-class="text-primary"
        label-style="font-size: 1.1em" />
    </q-card>
  </q-dialog>
  <ColorPickerModal v-model="showColorPickerModal" @addColor="addColor" />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { appApi } from '@/api/appApi'
import { ProductForm, ProductErrors } from '@/interfaces/product.interface'
import { useUploadImage } from '@/composables/useUploadImage';
import { useQuasar } from 'quasar'
import { Camera, CameraDirection, CameraResultType, CameraSource } from '@capacitor/camera';
import { Keyboard } from '@capacitor/keyboard';
import { Brand, Category, Size, Gender } from '@/interfaces/product.interface';
import { ProductFormDataResponse, ProductToProductForm } from '@/interfaces/product.interface';
import ColorPickerModal from '@/components/ColorPickerModal.vue'
import { useProduct } from '@/composables/useProduct';

const props = defineProps(['showModal', 'productId']);
const emit = defineEmits(['update:showModal', 'reloadData']);
const form = ref<ProductForm>({
  name: '',
  price: null,
  stock: null,
  images: [],
  brand_id: null,
  category_id: null,
  colors: [],
  description: '',
  free_shipping: false,
  genders: [],
  sizes: []
})

const errors = ref<ProductErrors>({});
const loading = ref(false)
const images = ref<File[]>([])
const title = ref('')
const slide = ref(1)
const nameInput = ref<HTMLInputElement | null>(null)
const $useProduct = useProduct()

const initForm = () => {
  form.value = {
    name: '',
    price: null,
    stock: null,
    images: [],
    brand_id: null,
    category_id: null,
    colors: [],
    description: '',
    free_shipping: false,
    genders: [],
    sizes: []
  }
  errors.value = {}
  images.value = []
}

const openModal = () => {
  initForm()
  loadProduct()
}

const closeModal = () => {
  initForm()
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
    const productResponse = await $useProduct.getProduct(props.productId)
    form.value = ProductToProductForm(productResponse)
  } else {
    title.value = 'New Product'
    nameInput.value?.focus()
  }
  await loadFormData()
  loading.value = false
}

const $q = useQuasar()

const submit = async () => {
  loading.value = true
  if ($q.platform.is.capacitor) {
    Keyboard.hide()
  }
  try {
    if (props.productId) {
      await $useProduct.updateProduct(props.productId, form.value)
    } else {
      await $useProduct.createProduct(form.value)
    }
    emit('reloadData')
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

const onDelete = async (id: number) => {
  loading.value = true
  try {
    await $useProduct.deleteProduct(id)
    emit('reloadData')
    closeModal()
  } catch (error: any) { }
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

const brands = ref<Brand[]>([])
const categories = ref<Category[]>([])
const sizes = ref<Size[]>([])
const genders = ref<Gender[]>([])

const loadFormData = async () => {
  const response = await appApi.get<ProductFormDataResponse>(`/products/form-data`)
  const formData = response.data
  brands.value = formData.brands
  categories.value = formData.categories
  sizes.value = formData.sizes
  genders.value = formData.genders
}

const showColorPickerModal = ref(false)

const openColorPickModal = () => {
  showColorPickerModal.value = true
}

const addColor = (color: string) => {
  form.value.colors.push(color)
}

const removeColor = (index: number) => {
  form.value.colors.splice(index, 1)
}

const imageInput = ref<any>(null)
const clickAddImage = () => {
  imageInput.value?.pickFiles()
}

const removeImage = (index: number) => {
  $q.dialog({
    title: 'Confirm delete',
    message: 'Are you sure you want to delete this image?',
    cancel: true,
  })
    .onOk(() => {
      form.value.images.splice(index, 1)
    })
}
</script>

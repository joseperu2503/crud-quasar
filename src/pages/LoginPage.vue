<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex flex-col justify-between px-5 py-4" v-if="$q.platform.is.mobile">
        <div class=" w-full">
        </div>
        <div class="px-4 w-full py-8">
          <LoginForm />
        </div>
        <div class="flex justify-center">
          <div>
            <div class="text-[10px] text-gray-600">Powered by</div>
            <img src="@/assets/joseperez-logo.svg" alt="joseperez-icon" class="w-28">
          </div>
        </div>
      </q-page>
      <q-page class="flex justify-center items-center px-5 py-16" v-else>
        <q-card class="q-pa-md w-full max-w-md">
          <q-card-section>
            <LoginForm />
            <div class="flex justify-center mt-8">
              <div>
                <div class="text-[10px] text-gray-600">Powered by</div>
                <img src="@/assets/joseperez-logo.svg" alt="joseperez-icon" class="w-28">
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import LoginForm from '@/components/login/LoginForm.vue'
import { useQuasar } from 'quasar'
const $q = useQuasar()

</script>

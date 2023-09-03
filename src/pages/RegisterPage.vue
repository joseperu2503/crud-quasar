<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex justify-center items-center px-5 py-16">
        <div v-if="$q.platform.is.mobile" class="px-4 w-full">
          <RegisterForm />
        </div>

        <q-card class="q-pa-md w-full max-w-md" v-else>
          <q-card-section>
            <RegisterForm />
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import RegisterForm from '@/components/register/RegisterForm.vue'
import { useQuasar } from 'quasar'
const $q = useQuasar()
</script>

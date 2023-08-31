<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex justify-center items-center">
        <q-card class="q-pa-md q-ma-xl" style="width: 90%; max-width: 400px">
          <q-card-section>
            <div class="text-h6">Login</div>
          </q-card-section>
          <q-card-section>
            <q-form @keydown.enter="login" class="q-gutter-md">
              <q-input v-model="loginForm.email" label="Email" :error="!!loginErrors.email"
                :error-message="loginErrors.email?.[0]" name="email">
                <template v-slot:prepend>
                  <q-icon name="email" />
                </template>
              </q-input>
              <q-input v-model="loginForm.password" label="Password" :type="showPassword ? 'text' : 'password'"
                :error="!!loginErrors.password" :error-message="loginErrors.password?.[0]" name="password">
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
                <template v-slot:append>
                  <q-icon :name="showPassword ? 'visibility' : 'visibility_off'" class="cursor-pointer"
                    @click="showPassword = !showPassword" />
                </template>
              </q-input>
            </q-form>
            <q-btn label="Login" color="primary" class="q-mt-xl full-width" @click="login" :loading="loading" />
          </q-card-section>
        </q-card>

      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useLogin } from '@/composables/useLogin'

const { login, loginForm, loginErrors, loading, showPassword } = useLogin()
</script>

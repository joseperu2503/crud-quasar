<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex justify-center items-center px-5 py-16">
        <q-card class="q-pa-md w-full max-w-md">
          <div class="flex justify-center mb-6">
            <q-img src="@/assets/quasar-logo.svg" class="w-32" />
          </div>
          <q-card-section>
            <div class="text-2xl font-semibold text-gray-700">Welcome back!</div>
            <div class="text-sm text-gray-600">Sign in to continue</div>
          </q-card-section>
          <q-card-section>
            <q-form @keydown.enter="login" class="q-gutter-md">
              <q-input v-model="loginForm.email" label="Email" :error="!!loginErrors.email"
                :error-message="loginErrors.email?.[0]" name="email" type="email">
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
            <div class="text-sm text-gray-600 flex gap-1.5 justify-center mt-6">
              Don't have an account?
              <router-link to="/register" class="font-semibold hover:underline">Sign up</router-link>
            </div>
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

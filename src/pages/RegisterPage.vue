<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex justify-center items-center">
        <q-card class="q-pa-md q-ma-xl" style="width: 90%; max-width: 400px">
          <q-card-section>
            <div class="text-h6">Register</div>
          </q-card-section>
          <q-card-section>
            <q-form @keydown.enter="register" class="q-gutter-md">
              <q-input v-model="registerForm.name" label="Name" :error="!!registerErrors.name"
                :error-message="registerErrors.name?.[0]" name="name">
                <template v-slot:prepend>
                  <q-icon name="person" />
                </template>
              </q-input>
              <q-input v-model="registerForm.email" label="Email" :error="!!registerErrors.email"
                :error-message="registerErrors.email?.[0]" name="email">
                <template v-slot:prepend>
                  <q-icon name="email" />
                </template>
              </q-input>
              <q-input v-model="registerForm.password" label="Password" :type="showPassword ? 'text' : 'password'"
                :error="!!registerErrors.password" :error-message="registerErrors.password?.[0]" name="password">
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
                <template v-slot:append>
                  <q-icon :name="showPassword ? 'visibility' : 'visibility_off'" class="cursor-pointer"
                    @click="showPassword = !showPassword" />
                </template>
              </q-input>
              <q-input v-model="registerForm.password_confirmation" label="Confirm Password"
                :type="showPassword ? 'text' : 'password'" :error="!!registerErrors.password_confirmation"
                :error-message="registerErrors.password_confirmation?.[0]" name="password">
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
                <template v-slot:append>
                  <q-icon :name="showPassword ? 'visibility' : 'visibility_off'" class="cursor-pointer"
                    @click="showPassword = !showPassword" />
                </template>
              </q-input>
            </q-form>
            <q-btn label="Sign in" color="primary" class="q-mt-xl full-width" @click="register" :loading="loading" />
          </q-card-section>
        </q-card>

      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useRegister } from '@/composables/useRegister'

const { register, registerForm, registerErrors, loading, showPassword } = useRegister()
</script>

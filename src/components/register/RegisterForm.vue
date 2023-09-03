<template>
  <div class="text-2xl font-semibold text-gray-700">Register</div>
  <q-form @keydown.enter="register" class="q-gutter-xs mt-6">
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
  <q-btn label="Sign up" color="primary" class="q-mt-xl full-width" @click="register" :loading="loading" />
  <div class="text-sm text-gray-600 flex gap-1.5 justify-center mt-6">
    Already have an account?
    <router-link to="/login" class="font-semibold hover:underline">Sign in</router-link>
  </div>
</template>

<script setup lang="ts">
import { useRegister } from '@/composables/useRegister'

const { register, registerForm, registerErrors, loading, showPassword } = useRegister()
</script>

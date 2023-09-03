<template>
  <router-view />
</template>

<script setup lang="ts">
import { useStatusBar } from '@/composables/useStatusBar'
import { useToken } from '@/composables/useToken'
const { validToken } = useToken()

console.log('app')
const { setBackgroundColorWhite, setBackgroundColorPrimary } = useStatusBar()
if (validToken()) {
  setBackgroundColorPrimary()
} else {
  setBackgroundColorWhite()
}
</script>

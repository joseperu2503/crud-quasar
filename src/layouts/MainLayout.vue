<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          Crud Quasar
        </q-toolbar-title>
        <q-btn flat round dense icon="person">
          <q-menu>
            <q-list style="min-width: 100px">
              <q-item clickable v-close-popup>
                <q-item-section @click="logout">Logout</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useLogout } from '@/composables/useLogout'
const { logout } = useLogout()
// import { useStatusBar } from '@/composables/useStatusBar'

// const { setBackgroundColorPrimary } = useStatusBar()
// setBackgroundColorPrimary()

</script>

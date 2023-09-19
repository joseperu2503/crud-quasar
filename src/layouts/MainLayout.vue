<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          Crud Quasar
        </q-toolbar-title>
        <q-btn flat round dense :icon="$q.dark.mode ? 'dark_mode' : 'light_mode'" class="q-mr-xs" @click="toggleTheme" />
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
import { useQuasar } from 'quasar'
const { logout } = useLogout()
const $q = useQuasar()

const toggleTheme = () => {
  $q.dark.toggle()
}
</script>

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
            <div class="p-3">
              <div class="text-lg font-semibold">{{ user?.name }}</div>
              <div>{{ user?.email }}</div>
            </div>
            <q-separator></q-separator>
            <q-list style="min-width: 100px">
              <q-item clickable v-close-popup>
                <q-item-section>Profile</q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section>Settings</q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section @click="logout">
                  <div class="flex justify-between items-center">
                    Logout
                    <q-icon name="logout" size="18px"></q-icon>
                  </div>
                </q-item-section>
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
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { useQuasar } from 'quasar'
const { logout } = useLogout()
const $q = useQuasar()

const toggleTheme = () => {
  $q.dark.toggle()
}

const authStore = useAuthStore()
const { user } = storeToRefs(authStore);
</script>

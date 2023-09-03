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
import { StatusBar, Style } from '@capacitor/status-bar';
import { useQuasar } from 'quasar'

const $q = useQuasar()
$q.addressbarColor.set('#1976D2')
if ($q.platform.is.nativeMobile) {
  StatusBar.setBackgroundColor({ color: '#1976D2' });
}

</script>

<template>
  <div class="flex flex-col min-h-screen pb-10 px-4 pt-6">
    <!-- Header -->
    <header class="flex items-center mb-8">
      <NuxtLink to="/profile" class="text-white hover:text-white/80 transition-colors p-2 -ml-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
          stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </NuxtLink>
      <h1 class="text-xl font-bold text-white/90 flex-1 text-center pr-8">Settings</h1>
    </header>

    <!-- Menu Links -->
    <div class="space-y-6">

      <!-- Unit of Weight -->
      <button @click="toggleWeightUnit"
        class="w-full flex items-center justify-between text-white/90 hover:text-white group">
        <div class="flex items-center space-x-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-pawbby-muted" fill="none" viewBox="0 0 24 24"
            stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
          </svg>
          <span class="font-medium text-lg">Unit of Weight</span>
        </div>
        <div class="flex items-center space-x-2">
          <span class="text-sm text-pawbby-mutedDark group-hover:text-pawbby-muted transition-colors uppercase">{{
            user?.weightUnit || 'kg' }}</span>
          <svg xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-pawbby-mutedDark group-hover:text-pawbby-muted transition-colors" viewBox="0 0 20 20"
            fill="currentColor">
            <path fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd" />
          </svg>
        </div>
      </button>

      <!-- Language -->
      <button class="w-full flex items-center justify-between text-white/90 hover:text-white group">
        <div class="flex items-center space-x-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-pawbby-muted" fill="none" viewBox="0 0 24 24"
            stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
          <span class="font-medium text-lg">Language</span>
        </div>
        <div class="flex items-center space-x-2">
          <span class="text-sm text-pawbby-mutedDark group-hover:text-pawbby-muted transition-colors">English</span>
          <svg xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-pawbby-mutedDark group-hover:text-pawbby-muted transition-colors" viewBox="0 0 20 20"
            fill="currentColor">
            <path fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd" />
          </svg>
        </div>
      </button>

    </div>

    <!-- Tuya Config -->
    <div class="mt-8 bg-pawbby-card/50 rounded-3xl p-6 border border-white/5">
      <h2 class="text-lg font-bold text-white mb-4">Smart Litter Box Connection</h2>

      <div class="mb-4">
        <label class="block text-sm text-pawbby-muted mb-1">Connection Mode</label>
        <select v-model="tuyaForm.mode" disabled
          class="w-full bg-black/30 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none opacity-50 cursor-not-allowed">
          <option value="local">Local Network (Recommended)</option>
          <option value="cloud" disabled>Tuya Cloud (Coming Soon)</option>
        </select>
      </div>

      <div class="mb-4">
        <label class="block text-sm text-pawbby-muted mb-1">Device ID</label>
        <input v-model="tuyaForm.deviceId" type="text"
          class="w-full bg-black/30 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-pawbby-primary" />
      </div>

      <template v-if="tuyaForm.mode === 'local'">
        <div class="mb-4">
          <label class="block text-sm text-pawbby-muted mb-1">IP Address</label>
          <input v-model="tuyaForm.ipAddress" type="text"
            class="w-full bg-black/30 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-pawbby-primary" />
        </div>
        <div class="mb-6">
          <label class="block text-sm text-pawbby-muted mb-1">Local Key</label>
          <input v-model="tuyaForm.localKey" type="text"
            class="w-full bg-black/30 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-pawbby-primary" />
        </div>
      </template>

      <template v-if="tuyaForm.mode === 'cloud'">
        <div class="mb-4">
          <label class="block text-sm text-pawbby-muted mb-1">Tuya Client ID</label>
          <input v-model="tuyaForm.tuyaClientId" type="text"
            class="w-full bg-black/30 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-pawbby-primary" />
        </div>
        <div class="mb-4">
          <label class="block text-sm text-pawbby-muted mb-1">Tuya Client Secret</label>
          <input v-model="tuyaForm.tuyaClientSecret" type="text"
            class="w-full bg-black/30 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-pawbby-primary" />
        </div>
        <div class="mb-6">
          <label class="block text-sm text-pawbby-muted mb-1">Tuya Region</label>
          <input v-model="tuyaForm.tuyaRegion" type="text" placeholder="e.g. eu"
            class="w-full bg-black/30 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-pawbby-primary" />
        </div>
      </template>

      <button @click="saveTuyaConfig"
        class="w-full py-3 bg-pawbby-primary text-black font-bold rounded-2xl hover:bg-pawbby-secondary transition-colors">
        Save Connection
      </button>
    </div>

    <!-- Clear Data -->
    <div class="mt-auto pt-8 pb-4">
      <button @click="doClearCache"
        class="w-full text-center py-4 text-[#D84C4C] font-semibold text-lg hover:bg-white/5 rounded-2xl transition-colors">
        Remove stored information
      </button>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useApi, type User } from '~/composables/useApi'

definePageMeta({
  layout: 'detail'
})

const api = useApi()
const router = useRouter()
const user = ref<User | null>(null)
const tuyaForm = ref<any>({
  mode: 'local',
  deviceId: '',
  ipAddress: '',
  localKey: '',
  tuyaClientId: '',
  tuyaClientSecret: '',
  tuyaRegion: 'eu'
})

const loadData = async () => {
  user.value = await api.getUser()
  const config = await api.getTuyaConfig()
  if (config) {
    tuyaForm.value = { ...tuyaForm.value, ...config }
  }
}

onMounted(() => {
  loadData()
})

const saveTuyaConfig = async () => {
  await api.updateTuyaConfig(tuyaForm.value)
  alert('Tuya connection settings saved! The background daemon will restart and attempt to connect.')
}

const toggleWeightUnit = async () => {
  if (!user.value) return
  const newUnit = user.value.weightUnit === 'kg' ? 'lb' : 'kg'
  await api.updateUser({ weightUnit: newUnit })
  await loadData()
}

const doClearCache = async () => {
  if (confirm('Are you sure you want to clear all stored data? This will reset your profile and pets.')) {
    await api.clearCache()
    alert('Cache cleared. The app will now reload.')
    window.location.reload()
  }
}
</script>

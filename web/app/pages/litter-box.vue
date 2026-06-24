<template>
  <div class="flex flex-col min-h-screen pb-10">
    <!-- Header -->
    <header class="flex justify-between items-center p-4">
      <NuxtLink to="/" class="text-white p-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </NuxtLink>
      <div class="text-center">
        <h1 class="text-lg font-bold text-white/90">PAWBBY Litter Box</h1>
        <p class="text-xs text-pawbby-muted">{{ device?.status || 'Unknown' }}</p>
      </div>
      <button class="text-white p-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
        </svg>
      </button>
    </header>

    <!-- Product Image & Overlay Stats -->
    <div class="relative w-full flex justify-center mt-2 mb-6">
      <div class="w-64 h-64 relative">
        <img src="/litterbox.png" alt="Smart Litter Box" class="w-full h-full object-contain drop-shadow-2xl" />
        <!-- Overlay -->
        <div class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-4">
          <div class="flex items-baseline text-pawbby-secondary">
            <span class="text-5xl font-bold tracking-tighter">{{ device?.todayToileted || 0 }}</span>
            <span class="text-sm font-semibold ml-1">times</span>
          </div>
          <p class="text-pawbby-mutedDark text-xs mt-1">Today Toileted</p>
        </div>
      </div>
    </div>

    <!-- Status Cards -->
    <div class="px-4 grid grid-cols-3 gap-3 mb-8">
      <div class="bg-pawbby-card rounded-xl p-3 flex flex-col items-center justify-center space-y-2 border border-white/5">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-pawbby-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
        <span class="text-sm font-semibold text-white/90 text-center">{{ device?.litterLevel || '-' }}</span>
      </div>
      <div class="bg-pawbby-card rounded-xl p-3 flex flex-col items-center justify-center space-y-2 border border-white/5">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-pawbby-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
        <span class="text-sm font-semibold text-white/90 text-center">{{ device?.wasteBin || '-' }}</span>
      </div>
      <div class="bg-pawbby-card rounded-xl p-3 flex flex-col items-center justify-center space-y-2 border border-white/5">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-pawbby-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span class="text-sm font-semibold text-white/90 text-center">{{ device?.daysLeft || 0 }} Days</span>
      </div>
    </div>

    <!-- Tabs Container -->
    <div class="bg-pawbby-card/50 rounded-t-3xl flex-1 px-4 py-6 border-t border-white/5">
      <!-- Tabs -->
      <div class="flex justify-around mb-6 border-b border-white/10 pb-2">
        <div @click="activeTab = 'record'" class="flex flex-col items-center space-y-1 cursor-pointer">
          <span :class="[activeTab === 'record' ? 'text-white font-bold' : 'text-pawbby-muted hover:text-white/80', 'text-lg transition-colors']">Record</span>
          <div :class="[activeTab === 'record' ? 'bg-pawbby-primary' : 'bg-transparent', 'w-4 h-1 rounded-full']"></div>
        </div>
        <div @click="activeTab = 'history'" class="flex flex-col items-center space-y-1 cursor-pointer">
          <span :class="[activeTab === 'history' ? 'text-white font-bold' : 'text-pawbby-muted hover:text-white/80', 'text-lg transition-colors']">History</span>
          <div :class="[activeTab === 'history' ? 'bg-pawbby-primary' : 'bg-transparent', 'w-4 h-1 rounded-full']"></div>
        </div>
        <div @click="activeTab = 'control'" class="flex flex-col items-center space-y-1 cursor-pointer">
          <span :class="[activeTab === 'control' ? 'text-white font-bold' : 'text-pawbby-muted hover:text-white/80', 'text-lg transition-colors']">Control</span>
          <div :class="[activeTab === 'control' ? 'bg-pawbby-primary' : 'bg-transparent', 'w-4 h-1 rounded-full']"></div>
        </div>
      </div>

      <!-- Record Content -->
      <div v-if="activeTab === 'record'" class="space-y-4 animate-fade-in">
        <div class="flex justify-between items-center relative">
          <h3 class="text-white/90 font-semibold text-lg">Detailed Record</h3>
          
          <!-- Date Picker -->
          <div class="relative">
            <input 
              type="date" 
              v-model="selectedDateFilter"
              class="bg-white/10 border border-white/5 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-pawbby-primary cursor-pointer [&::-webkit-calendar-picker-indicator]:filter-[invert(1)]"
            />
          </div>
        </div>

        <p class="text-pawbby-muted text-sm leading-relaxed">
          WhiskerSense matches cats based on their weight, so please update it promptly if there are any changes in your cat's weight.
        </p>

        <!-- Pet Chips -->
        <div class="flex space-x-2 overflow-x-auto scrollbar-hide py-2">
          <button 
            @click="selectedPetFilter = 'all'"
            :class="[selectedPetFilter === 'all' ? 'bg-pawbby-primary/20 border-pawbby-primary text-pawbby-secondary' : 'bg-white/5 border-white/10 text-pawbby-muted hover:text-white', 'relative flex items-center border rounded-full px-4 py-1.5 text-sm font-medium whitespace-nowrap transition-colors']"
          >
            <span>All</span>
            <div v-if="device?.todayToileted" class="absolute -top-1.5 -right-1.5 flex h-4 min-w-[16px] px-1 items-center justify-center rounded-full bg-pawbby-secondary text-[10px] font-bold text-pawbby-bg shadow-sm">
              {{ device.todayToileted }}
            </div>
          </button>
          
          <!-- Dynamic Pets from State -->
          <button 
            v-for="pet in pets" 
            :key="pet.id" 
            @click="selectedPetFilter = pet.id"
            :class="[selectedPetFilter === pet.id ? 'bg-pawbby-primary/20 border-pawbby-primary text-pawbby-secondary' : 'bg-white/5 border-white/10 text-pawbby-muted hover:text-white', 'relative flex items-center border rounded-full px-4 py-1.5 text-sm font-medium whitespace-nowrap transition-colors']"
          >
            <span>{{ pet.name }}</span>
            <div v-if="getPetLogCount(pet.id) > 0" class="absolute -top-1.5 -right-1.5 flex h-4 min-w-[16px] px-1 items-center justify-center rounded-full bg-pawbby-secondary text-[10px] font-bold text-pawbby-bg shadow-sm">
              {{ getPetLogCount(pet.id) }}
            </div>
          </button>
        </div>

        <!-- Timeline List -->
        <div class="space-y-6 pt-4">
          
          <div v-for="log in filteredLogs" :key="log.id" class="flex space-x-4">
            <div class="flex-shrink-0 mt-1">
              
              <!-- Icon Logic Based on Log Type -->
              <div v-if="log.type === 'auto-clean' || log.type === 'flatten' || log.type === 'empty'" class="w-8 h-8 rounded-lg bg-[#2A6372] flex items-center justify-center text-white font-bold text-sm uppercase">
                {{ log.type[0] }}
              </div>

              <div v-else-if="log.type === 'manual-clean'" class="w-8 h-8 rounded-lg bg-[#3D7A41] flex items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>

              <div v-else-if="log.type === 'toileted' && getPetInfo(log.petId)?.imageBase64" class="w-8 h-8 rounded-lg overflow-hidden border border-white/10 bg-white/5">
                <img :src="getPetInfo(log.petId)?.imageBase64" class="w-full h-full object-cover" />
              </div>

              <div v-else class="w-8 h-8 rounded-lg bg-pawbby-card flex items-center justify-center text-pawbby-muted">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>

            </div>
            <div>
              <p class="text-white/90 text-base leading-snug">{{ log.description }}</p>
              <p class="text-pawbby-mutedDark text-xs mt-1">{{ log.timestamp }}</p>
            </div>
          </div>
          
          <div v-if="filteredLogs.length === 0" class="text-center text-pawbby-muted py-8">
            No records found.
          </div>

        </div>
      </div>
      
      <!-- Control Content -->
      <div v-if="activeTab === 'control'" class="space-y-6 animate-fade-in py-4">
        <h3 class="text-white/90 font-semibold text-lg text-center mb-6">Device Controls</h3>
        
        <div class="grid grid-cols-1 gap-4">
          <button @click="doClean" :disabled="isBusy" class="bg-pawbby-card border border-white/10 p-5 rounded-2xl flex items-center justify-between hover:bg-white/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            <div class="flex items-center space-x-4">
              <div class="bg-[#3D7A41] p-3 rounded-xl text-white">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <div class="text-left">
                <h4 class="text-white font-semibold text-lg">Clean Litter</h4>
                <p class="text-pawbby-muted text-sm mt-1">Start a manual cleaning cycle</p>
              </div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-pawbby-muted" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
            </svg>
          </button>

          <button @click="doFlatten" :disabled="isBusy" class="bg-pawbby-card border border-white/10 p-5 rounded-2xl flex items-center justify-between hover:bg-white/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            <div class="flex items-center space-x-4">
              <div class="bg-[#2A6372] p-3 rounded-xl text-white">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 8h16M4 16h16" />
                </svg>
              </div>
              <div class="text-left">
                <h4 class="text-white font-semibold text-lg">Flatten Litter</h4>
                <p class="text-pawbby-muted text-sm mt-1">Level the litter surface</p>
              </div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-pawbby-muted" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
            </svg>
          </button>

          <button @click="doEmpty" :disabled="isBusy" class="bg-pawbby-card border border-white/10 p-5 rounded-2xl flex items-center justify-between hover:bg-white/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            <div class="flex items-center space-x-4">
              <div class="bg-pawbby-primary p-3 rounded-xl text-pawbby-bg">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <div class="text-left">
                <h4 class="text-white font-semibold text-lg">Empty Litter Box</h4>
                <p class="text-pawbby-muted text-sm mt-1">Dump all litter into waste bin</p>
              </div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-pawbby-muted" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useApi, type Device, type Pet, type DeviceLog } from '~/composables/useApi'

definePageMeta({
  layout: 'detail'
})

const api = useApi()
const activeTab = ref('record')
const deviceId = 'dev_1'

const device = ref<Device | null>(null)
const pets = ref<Pet[]>([])
const logs = ref<DeviceLog[]>([])
let pollInterval: any = null

const loadData = async () => {
  device.value = (await api.getDevice(deviceId)) || null
  pets.value = await api.getPets()
  logs.value = await api.getLogs(deviceId)
}

onMounted(() => {
  loadData()
  // Poll every 2 seconds to catch status updates from our mock backend
  pollInterval = setInterval(loadData, 2000)
})

onUnmounted(() => {
  if (pollInterval) clearInterval(pollInterval)
})

const getPetInfo = (id?: string) => {
  return pets.value.find(p => p.id === id)
}

const getPetLogCount = (petId: string) => {
  return logs.value.filter(l => l.petId === petId && l.type === 'toileted').length
}

// Filtering
const selectedPetFilter = ref('all')
const selectedDateFilter = ref(new Date().toISOString().split('T')[0])

const filteredLogs = computed(() => {
  return logs.value.filter(log => {
    // Pet filter logic
    if (selectedPetFilter.value !== 'all') {
      if (log.petId !== selectedPetFilter.value) return false
    }
    
    // In a real app we'd parse log.timestamp and compare against selectedDateFilter
    // Since mock data only has a few entries from a hardcoded date, we just return true here 
    // to ensure the UI works visually.
    
    return true
  })
})

const isBusy = computed(() => {
  return device.value && device.value.status !== 'Ready'
})

const doClean = async () => {
  await api.triggerClean(deviceId)
  await loadData()
  activeTab.value = 'record'
}

const doFlatten = async () => {
  await api.triggerFlatten(deviceId)
  await loadData()
  activeTab.value = 'record'
}

const doEmpty = async () => {
  await api.triggerEmpty(deviceId)
  await loadData()
  activeTab.value = 'record'
}
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}
.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
.animate-fade-in {
  animation: fadeIn 0.3s ease-out forwards;
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>

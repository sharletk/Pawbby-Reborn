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
        <p class="text-xs text-pawbby-muted">Ready</p>
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
            <span class="text-5xl font-bold tracking-tighter">12</span>
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
        <span class="text-sm font-semibold text-white/90">Sufficient</span>
      </div>
      <div class="bg-pawbby-card rounded-xl p-3 flex flex-col items-center justify-center space-y-2 border border-white/5">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-pawbby-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
        <span class="text-sm font-semibold text-white/90">Not Full</span>
      </div>
      <div class="bg-pawbby-card rounded-xl p-3 flex flex-col items-center justify-center space-y-2 border border-white/5">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-pawbby-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span class="text-sm font-semibold text-white/90">20 Days</span>
      </div>
    </div>

    <!-- Tabs Container -->
    <div class="bg-pawbby-card/50 rounded-t-3xl flex-1 px-4 py-6 border-t border-white/5">
      <!-- Tabs -->
      <div class="flex justify-around mb-6 border-b border-white/10 pb-2">
        <div class="flex flex-col items-center space-y-1 cursor-pointer">
          <span class="text-white font-bold text-lg">Record</span>
          <div class="w-4 h-1 bg-pawbby-primary rounded-full"></div>
        </div>
        <div class="flex flex-col items-center space-y-1 cursor-pointer text-pawbby-muted hover:text-white/80 transition-colors">
          <span class="font-medium text-lg">History</span>
          <div class="w-4 h-1 bg-transparent rounded-full"></div>
        </div>
        <div class="flex flex-col items-center space-y-1 cursor-pointer text-pawbby-muted hover:text-white/80 transition-colors">
          <span class="font-medium text-lg">Control</span>
          <div class="w-4 h-1 bg-transparent rounded-full"></div>
        </div>
      </div>

      <!-- Record Content -->
      <div class="space-y-4">
        <div class="flex justify-between items-center">
          <h3 class="text-white/90 font-semibold text-lg">Detailed Record</h3>
          <button class="flex items-center space-x-1 bg-white/10 rounded-lg px-3 py-1.5 text-sm text-pawbby-muted hover:text-white transition-colors">
            <span>Today</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        <p class="text-pawbby-muted text-sm leading-relaxed">
          WhiskerSense matches cats based on their weight, so please update it promptly if there are any changes in your cat's weight.
        </p>

        <!-- Pet Chips -->
        <div class="flex space-x-2 overflow-x-auto scrollbar-hide py-2">
          <button class="flex items-center space-x-1 bg-pawbby-primary/20 border border-pawbby-primary text-pawbby-secondary rounded-full px-4 py-1.5 text-sm font-medium whitespace-nowrap">
            <span>All</span>
            <span>💩 12</span>
          </button>
          <button class="flex items-center space-x-1 bg-white/5 border border-white/10 text-pawbby-muted hover:text-white transition-colors rounded-full px-4 py-1.5 text-sm font-medium whitespace-nowrap">
            <span>Sala</span>
            <span>💩 4</span>
          </button>
          <button class="flex items-center space-x-1 bg-white/5 border border-white/10 text-pawbby-muted hover:text-white transition-colors rounded-full px-4 py-1.5 text-sm font-medium whitespace-nowrap">
            <span>Landy</span>
            <span>💩 5</span>
          </button>
          <button class="flex items-center space-x-1 bg-white/5 border border-white/10 text-pawbby-muted hover:text-white transition-colors rounded-full px-4 py-1.5 text-sm font-medium whitespace-nowrap">
            <span>Bibi</span>
            <span>💩 3</span>
          </button>
        </div>

        <!-- Timeline List -->
        <div class="space-y-6 pt-4">
          
          <div class="flex space-x-4">
            <div class="flex-shrink-0 mt-1">
              <div class="w-8 h-8 rounded-lg bg-[#2A6372] flex items-center justify-center text-white font-bold text-sm">
                A
              </div>
            </div>
            <div>
              <p class="text-white/90 text-base">auto-clean completed.</p>
              <p class="text-pawbby-mutedDark text-xs mt-1">5/16 15:02</p>
            </div>
          </div>

          <div class="flex space-x-4">
            <div class="flex-shrink-0 mt-1">
              <div class="w-8 h-8 rounded-lg bg-[#3D7A41] flex items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
            </div>
            <div>
              <p class="text-white/90 text-base">Manual cleaning completed.</p>
              <p class="text-pawbby-mutedDark text-xs mt-1">5/16 15:02</p>
            </div>
          </div>

          <div class="flex space-x-4">
            <div class="flex-shrink-0 mt-1">
              <div class="w-8 h-8 rounded-lg overflow-hidden border border-white/10">
                <img src="/pet_sala_1782295447985.png" class="w-full h-full object-cover" />
              </div>
            </div>
            <div>
              <p class="text-white/90 text-base leading-snug">Sala has toileted, stay for 19", weight of 8.2lb.</p>
              <p class="text-pawbby-mutedDark text-xs mt-1">5/16 15:02</p>
            </div>
          </div>

        </div>

      </div>
    </div>

  </div>
</template>

<script setup>
definePageMeta({
  layout: 'detail'
})
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}
.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>

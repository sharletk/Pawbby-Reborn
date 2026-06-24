<template>
  <div>
    <!-- Header -->
    <header class="flex justify-between items-center p-6 pb-4">
      <div class="w-6"></div> <!-- Spacer for centering -->
      <img src="/logo-nobg.png" alt="PAWBBY" class="h-12 object-contain" />
      <button class="text-2xl text-white/80 hover:text-white transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </header>

    <!-- Main Content -->
    <div class="px-4 py-2 space-y-4">
      <!-- Smart Litter Box Card -->
      <NuxtLink to="/litter-box" class="bg-pawbby-card rounded-2xl p-5 flex relative overflow-hidden transition-transform transform hover:scale-[1.02] cursor-pointer shadow-lg border border-white/5 block">
        
        <div class="flex-1 z-10 flex flex-col justify-between min-h-[120px]">
          <div>
            <h2 class="text-lg font-semibold text-white/90 leading-tight pr-24">PAWBBY Smart Litter Box</h2>
            <p class="text-pawbby-muted text-sm mt-1">Last Toileted 09:02</p>
          </div>
          
          <div class="mt-8">
            <div class="flex items-baseline text-pawbby-secondary">
              <span class="text-4xl font-bold tracking-tighter">12</span>
              <span class="text-sm font-semibold ml-1">times</span>
            </div>
            <p class="text-pawbby-mutedDark text-xs mt-1">Today Toileted</p>
          </div>
        </div>

        <div class="absolute right-[-10px] top-6 w-36 h-36 pointer-events-none drop-shadow-2xl">
          <img src="/litterbox.png" alt="Smart Litter Box" class="w-full h-full object-contain" />
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

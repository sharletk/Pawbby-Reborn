<template>
  <div class="px-4 py-6 space-y-8">

    <!-- User Profile Header -->
    <div class="flex items-center justify-between cursor-pointer">
      <div class="flex items-center space-x-4">
        <div class="w-16 h-16 rounded-2xl overflow-hidden border border-white/10">
          <img src="/avatar_olivia_1782295425826.png" alt="Olivia" class="w-full h-full object-cover" />
        </div>
        <div>
          <h2 class="text-xl font-bold text-white/90">Olivia</h2>
          <div class="flex items-center mt-1 bg-white/10 rounded-full px-2 py-0.5 text-xs text-pawbby-muted">
            <span>ID: 214009810</span>
            <button class="ml-2 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div class="text-pawbby-muted">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clip-rule="evenodd" />
        </svg>
      </div>
    </div>

    <!-- My Pets Section -->
    <div class="space-y-4">
      <div class="flex items-center text-white/90">
        <h3 class="text-lg font-semibold">My Pets</h3>
        <span class="mx-2 text-pawbby-mutedDark">&middot;</span>
        <span class="font-semibold">4</span>
      </div>

      <div class="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
        <div class="flex flex-col items-center space-y-2 min-w-[64px]">
          <div class="w-16 h-16 rounded-2xl overflow-hidden border border-white/5">
            <img src="/pet_bibi_1782295437667.png" class="w-full h-full object-cover" />
          </div>
          <span class="text-xs text-pawbby-muted">Bibi</span>
        </div>
        <div class="flex flex-col items-center space-y-2 min-w-[64px]">
          <div class="w-16 h-16 rounded-2xl overflow-hidden border border-white/5">
            <img src="/pet_sala_1782295447985.png" class="w-full h-full object-cover" />
          </div>
          <span class="text-xs text-pawbby-muted">Sala</span>
        </div>
        <div class="flex flex-col items-center space-y-2 min-w-[64px]">
          <div class="w-16 h-16 rounded-2xl overflow-hidden border border-white/5">
            <img src="/pet_paw_1782295458604.png" class="w-full h-full object-cover" />
          </div>
          <span class="text-xs text-pawbby-muted">Paw</span>
        </div>
        <div class="flex flex-col items-center space-y-2 min-w-[64px]">
          <div class="w-16 h-16 rounded-2xl overflow-hidden border border-white/5">
            <img src="/pet_elf_1782295475622.png" class="w-full h-full object-cover" />
          </div>
          <span class="text-xs text-pawbby-muted">Elf</span>
        </div>
        <div class="flex flex-col items-center space-y-2 min-w-[64px]">
          <button
            class="w-16 h-16 rounded-2xl bg-pawbby-card flex items-center justify-center text-pawbby-muted hover:text-white transition-colors border border-white/5">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Menu Links -->
    <div class="space-y-6 pt-4">
      <button class="w-full flex items-center justify-between text-white/80 hover:text-white group">
        <div class="flex items-center space-x-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-pawbby-muted" fill="none" viewBox="0 0 24 24"
            stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span class="font-medium text-lg">Notification</span>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-pawbby-mutedDark group-hover:text-pawbby-muted transition-colors" viewBox="0 0 20 20"
          fill="currentColor">
          <path fill-rule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clip-rule="evenodd" />
        </svg>
      </button>

      <button class="w-full flex items-center justify-between text-white/80 hover:text-white group">
        <div class="flex items-center space-x-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-pawbby-muted" fill="none" viewBox="0 0 24 24"
            stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span class="font-medium text-lg">Settings</span>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-pawbby-mutedDark group-hover:text-pawbby-muted transition-colors" viewBox="0 0 20 20"
          fill="currentColor">
          <path fill-rule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clip-rule="evenodd" />
        </svg>
      </button>

      <button class="w-full flex items-center justify-between text-white/80 hover:text-white group">
        <div class="flex items-center space-x-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-pawbby-muted" fill="none" viewBox="0 0 24 24"
            stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span class="font-medium text-lg">About PAWBBY Reborn</span>
        </div>
        <div class="flex items-center space-x-2">
          <span class="text-sm text-pawbby-mutedDark">V0.1</span>
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

  </div>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>

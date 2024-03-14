<script setup>
import { NAV_ITEMS } from '@/constants'
import NavItem from './NavItem.vue'
import { isPageValid } from '@/validators';

defineProps({
  currentPage: {
    required: true,
    type: String,
    validator: isPageValid,
  }
})

const emit = defineEmits({
  navigate: isPageValid,
})
</script>

<template>
  <nav class="sticky bottom-0 z-10 bg-white">
    <ul class="flex items-center justify-around border-t">
      <NavItem
        v-for="(icon, page) in NAV_ITEMS"
        :key="page"
        :href="`#${page}`"
        :class="{ 'bg-gray-200 pointer-event-none': page === currentPage }"
        @click="emit('navigate', page)"
      >
        <component :is="icon" class="h-6 w-6" /> {{ page }}
      </NavItem>
    </ul>
  </nav>
</template>

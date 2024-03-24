<script setup>
import ProgressItem from '../components/ProgressItem.vue'
import { trackedActivities } from '@/activities'
import TheProgressEmptyState from '../components/TheProgressEmptyState.vue'
</script>

<template>
  <ul v-if="trackedActivities.length" class="divide-y">
    <ProgressItem v-for="activity in trackedActivities" :key="activity.id" :activity="activity" />
  </ul>
  <TheProgressEmptyState v-else/>
</template>

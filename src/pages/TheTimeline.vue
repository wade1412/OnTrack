<script setup>
import { onActivated, onDeactivated } from 'vue'
import { timelineItems, scrollToCurrentHour, timelineItemRefs } from '@/timelineitems'
import TimelineItem from '../components/TimelineItem.vue'
import TheTimelineIndicator from '../components/TheTimelineIndicator.vue'
import { startTimer, stopTimer } from '@/time'

onActivated(() => {
  scrollToCurrentHour()

  startTimer()
})

onDeactivated(stopTimer)
</script>

<template>
  <div class="relative mt-7">
    <TheTimelineIndicator />
    <ul>
      <TimelineItem
        v-for="timelineItem in timelineItems"
        :key="timelineItem.hour"
        :timeline-item="timelineItem"
        ref="timelineItemRefs"
      />
    </ul>
  </div>
</template>

<script setup>
import { watchEffect } from 'vue'
import { BUTTON_TYPE_SUCCESS, BUTTON_TYPE_WARNING, BUTTON_TYPE_DANGER } from '@/constants'
import { formatSeconds } from '@/functions'
import { isTimelineItemValid } from '@/validators'
import { ICON_ARROW_PATH, ICON_PAUSE, ICON_PLAY } from '@/icons'
import { updateTimelineItem } from '@/timelineitems'
import { now } from '@/time'
import { useStopwatch } from '../composables/stopwatch.js'
import BaseButton from './BaseButton.vue'
import BaseIcon from './BaseIcon.vue'


const props = defineProps({
  timelineItem: {
    required: true,
    type: Object,
    validator: isTimelineItemValid
  }
})

const { seconds, isRunning, start, stop, reset } = useStopwatch(props.timelineItem.activitySeconds)

watchEffect(() => {
  if (props.timelineItem.hour !== now.value.getHours() && isRunning.value) {
    stop ()
  }
})

watchEffect(() =>
  updateTimelineItem(props.timelineItem, {
    activitySeconds: seconds.value
  })
)
</script>

<template>
  <div class="flex w-full gap-2">
    <BaseButton :type="BUTTON_TYPE_DANGER" :disabled="!timelineItem.activitySeconds" @click="reset">
      <BaseIcon :name="ICON_ARROW_PATH" />
    </BaseButton>
    <div class="flex flex-grow items-center rounded bg-gray-100 px-2 font-mono text-3xl">
      {{ formatSeconds(timelineItem.activitySeconds) }}
    </div>
    <BaseButton v-if="isRunning" :type="BUTTON_TYPE_WARNING" @click="stop">
      <BaseIcon :name="ICON_PAUSE" />
    </BaseButton>
    <BaseButton
      v-else
      :disabled="timelineItem.hour !== now.getHours()"
      :type="BUTTON_TYPE_SUCCESS"
      @click="start"
    >
      <BaseIcon :name="ICON_PLAY" />
    </BaseButton>
  </div>
</template>

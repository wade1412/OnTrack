<script setup>
import { BUTTON_TYPE_SUCCESS, BUTTON_TYPE_WARNING, BUTTON_TYPE_DANGER } from '@/constants'
import { formatSeconds } from '@/functions'
import { isTimelineItemValid } from '@/validators'
import { ICON_ARROW_PATH, ICON_PAUSE, ICON_PLAY } from '@/icons'
import {
  resetTimelineItemTimer,
  startTimelineItemTimer,
  stopTimelineItemTimer
} from '@/timelineitem-timer'
import { now } from '@/time'
import BaseButton from './BaseButton.vue'
import BaseIcon from './BaseIcon.vue'
import { activeTimelineItem } from '@/timelineitems'

defineProps({
  timelineItem: {
    required: true,
    type: Object,
    validator: isTimelineItemValid
  }
})
</script>

<template>
  <div class="flex w-full gap-2">
    <BaseButton
      :type="BUTTON_TYPE_DANGER"
      :disabled="!timelineItem.activitySeconds"
      @click="resetTimelineItemTimer(timelineItem)"
    >
      <BaseIcon :name="ICON_ARROW_PATH" />
    </BaseButton>
    <div class="flex flex-grow items-center rounded bg-gray-100 px-2 font-mono text-3xl">
      {{ formatSeconds(timelineItem.activitySeconds) }}
    </div>
    <BaseButton
      v-if="timelineItem === activeTimelineItem"
      :type="BUTTON_TYPE_WARNING"
      @click="stopTimelineItemTimer"
    >
      <BaseIcon :name="ICON_PAUSE" />
    </BaseButton>
    <BaseButton
      v-else
      :disabled="timelineItem.hour !== now.getHours()"
      :type="BUTTON_TYPE_SUCCESS"
      @click="startTimelineItemTimer(timelineItem)"
    >
      <BaseIcon :name="ICON_PLAY" />
    </BaseButton>
  </div>
</template>

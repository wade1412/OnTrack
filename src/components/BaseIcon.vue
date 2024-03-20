<script setup>
import {
  CheckCircleIcon as CheckCircle,
  ListBulletIcon as ListBullet,
  ClockIcon as Clock,
  XMarkIcon as XMark,
  PlusIcon as Plus,
  TrashIcon as Trash,
  ArrowPathIcon as ArrowPath,
  PauseIcon as Pause,
  PlayIcon as Play,
  ChartBarIcon as ChartBar
} from '@heroicons/vue/24/solid'

defineProps({
    name: {
        required: true,
        type: String,
    }
})

const icons = {
  CheckCircle,
  ListBullet,
  Clock,
  XMark,
  Plus,
  Trash,
  ArrowPath,
  Pause,
  Play,
  ChartBar
}
</script>

<template>
  <component :is="icons[name]" />
</template>

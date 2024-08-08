<script setup lang="ts">
import { toRefs, defineProps } from 'vue'
import { type Event } from '@/types'


const props = defineProps<{
    event: Event
}>()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { event } = toRefs(props)
</script>

<template>
    <p>Edit event here</p>
</template>
    

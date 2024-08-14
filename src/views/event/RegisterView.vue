<script setup lang="ts">
import { toRefs, defineProps } from 'vue'
import { type Event } from '@/types'
import { useRouter } from 'vue-router';
import { useMessageStore } from '@/stores/message'

const props = defineProps<{
    event: Event
    id: String
}>()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { event } = toRefs(props)
const router = useRouter()
const store = useMessageStore ()
const register = () => {
  store.updateMessage('You are successuflly registered for ' + props.event.title)
  setTimeout (() => {
    store.resetMessage()
  }, 3000)
  router.push({ name: 'event-detail-view', params: { id: props.event.id } })
  }
</script>

<template>
    <p>Register event here</p>
    <button class="border-2 rounded px-[20px] mt-[20px] hover:bg-violet-600 hover:text-white  active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300" @click="register">Register</button>
</template>
<script setup lang="ts">

import EventService from '@/services/EventService';
import { useRouter } from 'vue-router';
import type { Event, Organizer, Participant  } from '@/types'
import { ref, onMounted } from 'vue'
import { useMessageStore } from '@/stores/message';
import BaseInput from '@/components/BaseInput.vue';
import BaseSelect from '@/components/BaseSelect.vue';
import OrganizerService from '@/services/OrgService'
import { options } from 'node_modules/axios/index.cjs';
import ImageUpload from '@/components/ImageUpload.vue';
const event = ref<Event> ({
    id: 0,
    category: '',
    title: '',
    description: '',
    location: '',
    date: '',
    time: '',
    petsAllowed: false,
    organizer: {
      id: 0,
      name: ''
    },
    participant: {
      id: 0,
      name: '',
      telNo: ''
    },
    images: []
})
const router = useRouter()
const store = useMessageStore()
function saveEvent() {
    EventService.saveEvent(event.value)
        .then((response) => {
            router.push({ name: 'event-detail-view', params: { id: response.data.id } })
            store.updateMessage('You are successfully add a new event for ' + response.data.title)
            setTimeout(() => {
                store.resetMessage()
            }, 3000)
        })
        .catch (() => {
            router.push({ name: 'network-error-view' })
        })
}
const organizers = ref<Organizer[]>([])
onMounted(() => {
  OrganizerService.getOrganizers()
  .then((response) => {
    organizers.value = response.data
  })
  .catch(() => {
    router.push({ name: 'network-error-view' })
  })
})
</script>

<template>
    <div class="max-w-2xl mx-auto p-6">
      <h1 class="text-3xl font-bold mb-6">Create an event</h1>
      <form @submit.prevent="saveEvent" class="space-y-6">
        <div>
          <BaseInput
            v-model="event.category"
            id="category"
            type="text"
            label="Category"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <h3 class="text-xl font-semibold mb-3 mt-[50px]">Name & describe your event</h3>
          <div class="space-y-4">
            <div>
              <BaseInput
                v-model="event.title"
                id="title"
                type="text"
                label="Title"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <BaseInput
                v-model="event.description"
                id="description"
                label="Description"
                rows="3"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
  
        <div>
          <h3 class="text-xl font-semibold mb-3 mt-[50px]">Where is your event?</h3>
          <div>
            <BaseInput
              v-model="event.location"
              id="location"
              type="text"
              label="Location"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <h3 class="text-xl font-semibold mb-3 mt-[50px]">Who is your organizer?</h3>
          <div>
            <label>Select an Organizer</label>
            <BaseSelect 
              v-model="event.organizer.id" 
              :options="organizers" 
              label="Organizer"
            />
            <h3>The image of the Event</h3>
            <ImageUpload v-model="event.images" />
          </div>
        </div>
  
        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Submit
        </button>
      </form>
  
      <pre class="mt-8 p-4 bg-gray-100 rounded-md overflow-auto">{{ event }}</pre>
    </div>
  </template>

<style scoped src="@/assets/form-style.css"></style>
<!-- <script setup lang="ts">
import type { EventItem } from '@/type'
import { ref } from 'vue'
const event = ref<EventItem> ( {
    id: 0,
    category: '',
    title: '',
    description: '',
    location: '',
    date: '',
    time: '',
    organizer: ''
})

</script>

<template>
    <div>
        <h1>Create an event</h1>
        <form>
            <label>Category</label>
            <input
                v-model="event.category"
                type="text"
                placeholder="Category"
                class="field"
            />
            <h3>Name & describe your event</h3>

            <label>Title</label>
            <input
                v-model="event.title"
                type="text"
                placeholder="Title"
                class="field"
            />

            <label>Description</label>
                <input
                v-model="event.description"
                type="text"
                placeholder="Description"
                class="field"
            />

            <h3>Where is your event ?</h3>

            <label>Location</label>
            <input
                v-model="event.location"
                type="text"
                placeholder="Location"
                class="field"
            />
            <button type="submit">Submit</button>
        </form>

        <pre>{{ event }}</pre>
    </div>
</template>-->
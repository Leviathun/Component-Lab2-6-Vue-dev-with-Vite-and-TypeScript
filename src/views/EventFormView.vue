<script setup lang="ts">

import EventService from '@/services/EventService';
import { useRouter } from 'vue-router';
import type { Event } from '@/types'
import { ref } from 'vue'
import { useMessageStore } from '@/stores/message';
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
    }
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
</script>

<template>
    <div class="max-w-2xl mx-auto p-6">
      <h1 class="text-3xl font-bold mb-6">Create an event</h1>
      <form @submit.prevent="saveEvent" class="space-y-6">
        <div>
          <label for="category" class="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <input
            v-model="event.category"
            id="category"
            type="text"
            placeholder="Category"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <h3 class="text-xl font-semibold mb-3 mt-[50px]">Name & describe your event</h3>
          <div class="space-y-4">
            <div>
              <label for="title" class="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                v-model="event.title"
                id="title"
                type="text"
                placeholder="Title"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label for="description" class="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                v-model="event.description"
                id="description"
                placeholder="Description"
                rows="3"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>
          </div>
        </div>
  
        <div>
          <h3 class="text-xl font-semibold mb-3 mt-[50px]">Where is your event?</h3>
          <div>
            <label for="location" class="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              v-model="event.location"
              id="location"
              type="text"
              placeholder="Location"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
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
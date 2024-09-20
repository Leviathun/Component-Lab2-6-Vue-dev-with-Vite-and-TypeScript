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
    organizer: ''
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
    <div>
        <h1>Create an event</h1>
        <form @submit.prevent="saveEvent">
            <label>Category</label>
            <input v-model="event.category" type="text" placeholder="Category" class="field"/>
            
            <h3>Name & describe your event</h3>
            <label>Title</label>
            <input v-model="event.title" type="text" placeholder="Title" class="field"/>
            <label>Description</label>
            <input v-model="event.description" type="text" placeholder="Description" class="field" />

            <h3>Where is your event?</h3>
            <label>Location</label>
            <input v-model="event.location" type="text" placeholder="Location" class="field" />

            <button class="button" type="submit">Submit</button>

        </form>

        <pre>{{ event }}</pre>
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
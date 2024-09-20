<script setup lang="ts">

import OrgService from '@/services/OrgService';
import { useRouter } from 'vue-router';
import type { Organizer } from '@/types'
import { ref } from 'vue'
import { useMessageStore } from '@/stores/message';
const organizer = ref<Organizer> ({
    id: 0,
    organizationName: "",
    address : ""
})
const router = useRouter()
const store = useMessageStore()
function saveEvent() {
    OrgService.saveOrg(organizer.value)
        .then((response) => {
            router.push({ name: 'event-detail-view', params: { id: response.data.id } })
            store.updateMessage('You are successfully add a new org for ' + response.data.organizationName)
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
            
            <h3>Name & describe your event</h3>
            <label>Title</label>
            <input v-model="organizer.organizationName" type="text" placeholder="organizationName" class="field"/>
            
            <h3>Where is your event?</h3>
            <label>Address</label>
            <input v-model="organizer.address" type="text" placeholder="address" class="field" />

            <button class="button" type="submit">Submit</button>

        </form>

        <pre>{{ organizer }}</pre>
    </div>
</template>
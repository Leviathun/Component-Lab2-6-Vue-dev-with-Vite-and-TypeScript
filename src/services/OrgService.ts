import type { Organizer } from '@/types'
import axios from 'axios'

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default {
    /*getEvents(perPage: Number, page: Number) {
        return apiClient.get('/events?_limit=' + perPage + '&_page=' + page)
    },
    getEvent(id: number) {
        return apiClient.get('/events/' + id)
    },
    saveOrg(organizer: Organizer) {
        return apiClient.post('/organizers', organizer)
    },*/
    getOrganizers() {
        return apiClient.get('/organizers')
    }
}
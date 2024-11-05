import apiClient from './AxiosClient'

export default {
    getEvents(perPage: Number, page: Number) {
        return apiClient.get('/events?_limit=' + perPage + '&_page=' + page)
    },
    getEvent(id: number) {
        return apiClient.get('/events/' + id)
    },
    saveEvent(event: Event) {
        return apiClient.post('/events', event)
    },
    getEventsByKeyword(keyword: string, perPage: number, page: number):Promise<AxiosResponse<EventItem[]>> {
        return apiClient.get<EventItem[]>('/events?title=' + keyword + '&_limit=' +perPage + '&_page=' + page)
    }
}
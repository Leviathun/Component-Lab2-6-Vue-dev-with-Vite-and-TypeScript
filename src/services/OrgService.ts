import apiClient from './AxiosClient'

export default {
    getOrganizers() {
        return apiClient.get('/organizers')
    },
    saveOrganizer(organizer: Organizer) {
    return apiClient.post('/organizers', organizer)
    },
    getOrganizerById(id: number): Promise<AxiosResponse<Organizer>> {
        return apiClient.get<Organizer>(`/organizers/${id}`)
    },
}
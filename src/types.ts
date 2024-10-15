export interface Event {
    id: number,
    category: string,
    title: string,
    description: string,
    location: string,
    date: string,
    time: string,
    petsAllowed: boolean,
    organizer: Organizer
    participant: Participant[]
}
export interface Student{
    id: number,
    studentId: string,
    name: string,
    surname: string,
    gpa: string,
    image: string,
    penAmount: number,
    description: string
}
export interface MessageState{
    message: string
}
export interface EventState {
    event: Event | null
}
 
export interface Organizer{
    id: number,
    name: String,
    address: String
}

export interface Participant {
    id: number
    name: string
    telNo: string
}

export interface OrganizerState {
    organizer: Organizer | null
}

export interface ParticipantState {
    participant: Participant | null
}

export interface AuctionItem {
    id: number
    organizationName: string
    address: string
    title: string
    description: string
    type: string
}
  
export interface AuctionItemState {
    auctionItem: AuctionItem | null
}
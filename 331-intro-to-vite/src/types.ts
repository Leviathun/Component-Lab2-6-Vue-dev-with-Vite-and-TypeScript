export interface Event {
    id: number,
    category: string,
    title: string,
    description: string,
    location: string,
    date: string,
    time: string,
    petsAllowed: boolean,
    organizer: string
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
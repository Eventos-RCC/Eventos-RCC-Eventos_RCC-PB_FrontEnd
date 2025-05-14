import { EventType } from "@/types/Event"
import { create } from "zustand"

interface eventStoreProps {
    events: EventType[]
    create: (event: EventType) => void
    setEvents: (events: EventType[]) => void
    getById: (id: string) => EventType | null
    update: (id: string, event: EventType) => void
    delete: (id: string) => void
}

export const useEventsStore = create<eventStoreProps>((set, get) => ({
        events: [],

        create: (event) => set((state) => ({ events: [...state.events, event] })),

        setEvents: (events) =>
            set(() => ({
                events,
            })),

        getById: (id: string) => {
            const state = get()
            const event = state.events.find(
                (event: EventType) => event.id === id
            )
            return event ? event : null
        },

        update: (id: string, event: EventType) =>
            set((state) => ({
                events: state.events.map((e) =>
                    e.id === id ? { ...e, ...event } : e
                ),
            })),

        delete: (id: string) =>
            set((state) => ({
                events: state.events.filter((event) => event.id !== id),
            })),

    }),

)
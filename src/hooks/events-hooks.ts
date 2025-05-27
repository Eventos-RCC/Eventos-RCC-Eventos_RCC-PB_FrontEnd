import api from "@/apis/api"
import { useEventsStore } from "@/store/events-store"
import { EventType } from "@/types/Event"
import { useState } from "react"

export const useEvents = () => {
    const {
        events,
        setEvents,
        create,
        getById,
        update,
        delete: deleteEvent,
    } = useEventsStore()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const createEvent = async (event: {
        name: string
        description: string
        startDate: string
        endDate: string
        eventType: string
        diocese: string
    }) => {
        
        setLoading(true)
        setError(null)

        try {
            const response = await api.post("/events", {
                ...event,
            })
            console.log(response.data) // para teste
            create(response.data)
            await getEvents()
            return response.data
        } catch (err) {
            setError("Error tryng to create event")
            throw new Error("Error tryng to create event")
        } finally {
            setLoading(false)
        }
    }

    const getEvents = async () => {
        setLoading(true)
        setError(null)

        try {
            const response = await api.get<EventType[]>("/events/all")
            setEvents(response.data)
            return response.data
        } catch (err) {
            setError("Error tryng to fetch events")
            throw new Error("Error tryng to fetch events")
        } finally {
            setLoading(false)
        }
    }

    const getEventById = async () => {
        setLoading(true)
        setError(null)

        try {
            const response = await api.get<EventType>(`/events/`)
            getById(response.data.id)
            return response.data
        } catch (err) {
            setError("Error tryng to fetch event")
            throw new Error("Error tryng to fetch event")
        } finally {
            setLoading(false)
        }
    }

    const updateEvent = async (event: EventType) => {
        setLoading(true)
        setError(null)

        try {
            const response = await api.put<EventType>(`/events/`, {
                ...event,
            })
            update(response.data.id, response.data)
            return response.data
        } catch (err) {
            setError("Error tryng to update event")
            throw new Error("Error tryng to update event")
        } finally {
            setLoading(false)
        }
    }

    const deleteEventById = async () => {
        setLoading(true)
        setError(null)

        try {
            const response = await api.delete(`/events/`)
            deleteEvent(response.data.id)
        } catch (err) {
            setError("Error tryng to delete event")
            throw new Error("Error tryng to delete event")
        } finally {
            setLoading(false)
        }
    }

return {
    events,
    setEvents,
    createEvent,
    getEvents,
    getEventById,
    updateEvent,
    deleteEventById,
    loading,
    setLoading,
    error,
    setError
}

}
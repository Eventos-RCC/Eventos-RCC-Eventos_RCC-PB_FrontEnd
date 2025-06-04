import { EventType } from "./Event";

export type UpdateEventType = Omit<EventType, "id">;
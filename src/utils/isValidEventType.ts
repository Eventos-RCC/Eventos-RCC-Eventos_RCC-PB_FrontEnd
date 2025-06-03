const validEventTypes = [
    "Retiro",
    "Congresso Estadual",
    "Congresso Diocesano",
    "Jesus no Litoral",
    "Jesus no Sertão",
    "Seminário de Vida no Espírito Santo",
] as const;

export function isValidEventType(value: string): value is typeof validEventTypes[number] {
    return validEventTypes.includes(value as any);
}
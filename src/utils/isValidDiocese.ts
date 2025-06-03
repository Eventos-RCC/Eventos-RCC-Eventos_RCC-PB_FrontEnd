const validDioceses = [
    "Arquidiocese da Paraíba",
    "Diocese de Guarabira",
    "Diocese de Campina Grande",
    "Diocese de Patos",
    "Diocese de Cajazeiras",
    "Outra",
] as const;

export function isValidDiocese(value: string): value is typeof validDioceses[number] {
    return validDioceses.includes(value as any);
}
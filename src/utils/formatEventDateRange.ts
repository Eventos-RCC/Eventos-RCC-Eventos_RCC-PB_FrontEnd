export function formatEventDateRange(startDateStr: string, endDateStr: string) {
    const [startDay, startMonth, startYear] = startDateStr.split('/').map(Number);
    const [endDay, endMonth, endYear] = endDateStr.split('/').map(Number);

    const startDate = new Date(startYear, startMonth - 1, startDay);
    const endDate = new Date(endYear, endMonth - 1, endDay);

    const dayStart = startDate.getDate().toString().padStart(2, '0');
    const monthStart = startDate.toLocaleDateString('pt-BR', { month: 'long' });
    const yearStart = startDate.getFullYear();

    const dayEnd = endDate.getDate().toString().padStart(2, '0');
    const monthEnd = endDate.toLocaleDateString('pt-BR', { month: 'long' });
    const yearEnd = endDate.getFullYear();

    if (startYear === endYear) {
        if (startMonth === endMonth) {
            // Mesmo mês e ano
            return `${dayStart} - ${dayEnd} de ${monthStart} de ${yearStart}`;
        } else {
            // Meses diferentes, mesmo ano
            return `${dayStart} de ${monthStart} - ${dayEnd} de ${monthEnd} de ${yearStart}`;
        }
    } else {
        // Anos diferentes
        return `${dayStart} de ${monthStart} de ${yearStart} - ${dayEnd} de ${monthEnd} de ${yearEnd}`;
    }
}

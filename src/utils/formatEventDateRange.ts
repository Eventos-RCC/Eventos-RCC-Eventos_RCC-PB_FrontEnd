export function formatEventDateRange(startDateStr: string, endDateStr: string) {
    const startDate = new Date(startDateStr)
    const endDate = new Date(endDateStr)

    const dayStart = startDate.getDate().toString().padStart(2, '0')
    const dayEnd = endDate.getDate().toString().padStart(2, '0')

    const month = startDate.toLocaleDateString('pt-BR', { month: 'long' })
    const year = startDate.getFullYear()

    return `${dayStart} - ${dayEnd} de ${month} de ${year}`
}
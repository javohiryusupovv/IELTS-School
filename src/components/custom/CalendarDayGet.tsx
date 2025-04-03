export function CalendarDayGet(startDate: Date | null, endDate: Date | null): string[] {
    if (!startDate || !endDate) return []; // Agar qiymatlar null bo'lsa, bo'sh array qaytaradi.

    const start = new Date(startDate);
    const end = new Date(endDate);
    const dates: string[] = [];

    while (start <= end) {
        dates.push(start.toISOString().split("T")[0]);
        start.setDate(start.getDate() + 1);
    }

    return dates;
}

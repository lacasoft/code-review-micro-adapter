export function createDateTimeFormated(hoursLess: number, timeHours: string): string {
    let cDate = new Date();
    cDate.setTime( cDate.getTime() - hoursLess * 3600000 );
    const nDate = cDate.toISOString();
    const idx = nDate.indexOf(".");
    const lastDate = nDate.slice(0,idx) + timeHours;

    return lastDate;
}
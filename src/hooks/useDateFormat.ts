
export const useDateFormat = (date: string) => {
    const newDate = new Date(date)
    const day = newDate.getDate()
    const month = newDate.getMonth()
    const year = newDate.getFullYear()
    console.log(day, month, year)
    return `${day}-${month}-${year}`
}
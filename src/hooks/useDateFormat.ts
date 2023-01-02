
export const useDateFormat = (uploadDate: string) => {
    const newDate = new Date(uploadDate)
    let date = newDate.getDate()
    let month = newDate.getMonth() + 1
    let year = newDate.getFullYear()

    if (date < 10) {
        date = `0${date}`
    }
    if (month < 10) {
        month = `0${month}`
    }

    return `${date}-${month}-${year}`
}
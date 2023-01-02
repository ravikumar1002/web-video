
export const useDateFormat = (uploadDate: string) => {
    const newDate = new Date(uploadDate)
    let date = String(newDate.getDate())
    let month = String(newDate.getMonth() + 1)
    let year = newDate.getFullYear()

    if (Number(date) < 10) {
        date = `0${date}`
    }
    if (Number(date) < 10) {
        month = `0${month}`
    }

    return `${date}-${month}-${year}`
}
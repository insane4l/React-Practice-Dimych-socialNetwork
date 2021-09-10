
export function getRandomIntegerNum(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

export function getCurrentDate() {
    const newDate = new Date()
    const day = newDate.getDate()
    const month = newDate.getMonth() +1
    const year = newDate.getFullYear()
    const hours = newDate.getHours() % 24
    const minutes = newDate.getMinutes() % 60

    return `${month}.${day}.${year} ${hours}:${minutes}`
}
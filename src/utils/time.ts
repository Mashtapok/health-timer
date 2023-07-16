export function makeTwoDigitNumber(number: number): string {
    return String(number).padStart(2, '0')
}

export function formatTime(time: number): string {
    const seconds = time % 60
    const minutes = Math.floor(time / 60)

    return `${minutes}:${makeTwoDigitNumber(seconds)}`
}
export const formatTime = (_seconds: number | null): string => {
  /**
   * @param _seconds: number
   * @returns string
   * @description
   * 1. Convert seconds to hours, minutes and seconds
   */
  if (_seconds === null) return '--:--'
  const hours = Math.floor(_seconds / 3600)
  const minutes = Math.floor((_seconds % 3600) / 60)
  const seconds = Math.floor(_seconds % 60)

  const hh = hours < 10 ? `0${hours}` : hours
  const mm = minutes < 10 ? `0${minutes}` : minutes
  const ss = seconds < 10 ? `0${seconds}` : seconds

  if (hours > 0) {
    return `${hh}:${mm}:${ss}`
  }

  return `${mm}:${ss}`
}

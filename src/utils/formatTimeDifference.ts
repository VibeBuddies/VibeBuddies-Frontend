export const formatTimeDifference = (timestamp: number): string => {
  const now = Date.now()
  const diffInSeconds = Math.floor((now - timestamp) / 1000)

  if (diffInSeconds < 60) {
    return `${diffInSeconds}s`
  } else if (diffInSeconds < 3600) {
    const diffInMinutes = Math.floor(diffInSeconds / 60)
    return `${diffInMinutes}m`
  } else if (diffInSeconds < 86400) {
    const diffInHours = Math.floor(diffInSeconds / 3600)
    return `${diffInHours}h`
  } else {
    const diffInDays = Math.floor(diffInSeconds / 86400)
    return `${diffInDays}d`
  }
}

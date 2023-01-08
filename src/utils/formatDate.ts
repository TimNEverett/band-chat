export const formatDate = (date: string) => {
  if (!date) return ''
  const d = new Date(date)
  return `${d.toLocaleString('en-US', { month: 'short' })} ${d.getDate()} ${d.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  })}`
}

// make a function to format the date using words like 'yeserday' or 'today' or day of the week
export const formatRelativeDate = (date: string) => {
  if (!date) return ''
  const d = new Date(date)
  const now = new Date()
  const diff = now.getTime() - d.getTime()
  const diffDays = Math.floor(diff / (1000 * 3600 * 24))
  if (diffDays === 0) {
    return 'Today'
  } else if (diffDays === 1) {
    return 'Yesterday'
  } else if (diffDays < 7) {
    return d.toLocaleString('en-US', { weekday: 'long' })
  } else {
    return `${d.toLocaleString('en-US', { month: 'short' })} ${d.getDate()}`
  }
}

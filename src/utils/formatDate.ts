export const formatDate = (date: string) => {
  const d = new Date(date)
  return `${d.toLocaleString('en-US', { month: 'short' })} ${d.getDate()} ${d.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  })}`
}

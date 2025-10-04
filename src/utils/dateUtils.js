export const formatCurrentDate = () => {
  const now = new Date()
  const formatter = new Intl.DateTimeFormat('ru-RU', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  })
  
  const parts = formatter.formatToParts(now)
  const weekday = parts.find(part => part.type === 'weekday').value
  const day = parts.find(part => part.type === 'day').value
  const month = parts.find(part => part.type === 'month').value

  return {
    weekday: weekday.charAt(0).toUpperCase() + weekday.slice(1),
    date: `${day} ${month}`
  }
}
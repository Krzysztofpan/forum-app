export const formatDate = (dateString: Date) => {
  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    month: 'long',
    year: 'numeric',
    day: 'numeric',
  }

  const formattedDateTime: string = new Date(dateString).toLocaleString(
    'en-US',
    dateOptions
  )

  return formattedDateTime
}

export const createDates = (
  startDate: Date,

  numberOfDays: number,
  direction: 'desc' | 'inc'
) => {
  const dates = []

  for (
    let i = 0;
    Math.abs(i) < numberOfDays;
    direction === 'desc' ? i-- : i++
  ) {
    const date = new Date(startDate)
    date.setDate(date.getDate() + i)
    dates[Math.abs(i)] = formatDate(date)
  }
  if (direction === 'desc')
    dates.sort(
      (a: string, b: string) => new Date(a).valueOf() - new Date(b).valueOf()
    )
  return dates
}

export const weekStart = (date: Date) => {
  let timestamp
  if (formatDate(new Date(date)).slice(0, 3) === 'Mon') {
    return date
  } else {
    for (let i = 1; ; i++) {
      timestamp = new Date(date).setDate(date.getDate() - i)
      const day = formatDate(new Date(timestamp)).slice(0, 3)
      if (day === 'Mon') {
        break
      }
    }
  }

  return timestamp
}

export const getDateToWeekEnd = (date: Date) => {
  const datesArray = []
  const weekDay = formatDate(date).slice(0, 3)
  if (weekDay === 'Sun') {
    return [weekDay]
  }
  for (let i = 0; ; i++) {
    const timestamp = new Date(new Date(date).setDate(date.getDate() + i))
    const day = formatDate(timestamp).slice(0, 3)

    datesArray.push(formatDate(timestamp))
    if (day === 'Sun') {
      break
    }
  }
  return datesArray
}
export const getDateToMonthEnd = (date: Date) => {
  const datesArray = []

  const lastDayOfMonth = new Date(date)

  lastDayOfMonth.setMonth(lastDayOfMonth.getMonth() + 1)
  lastDayOfMonth.setDate(1)

  for (let i = 0; ; i++) {
    const timestamp = new Date(new Date(date).setDate(date.getDate() + i))

    if (String(timestamp) === String(lastDayOfMonth)) {
      break
    }
    datesArray.push(formatDate(timestamp))
  }
  return datesArray
}

export function convertHourToDecimal(timeStr: string) {
  // Rozdziel godzinę i minuty
  const parts = timeStr.split(':')
  const hours = parseInt(parts[0])
  const minutes = parseInt(parts[1])

  // Przelicz minuty na część godziny
  const decimalPart = minutes / 60

  // Dodaj godziny i część godziny
  return hours + decimalPart
}

export function generateHours(start: string, end: string) {
  const convertedStart = parseInt(start)
  const convertedEnd = parseInt(end)

  const hoursArray = [`${convertedStart}:00`]
  for (let i = convertedStart + 1; i <= convertedEnd; i++) {
    hoursArray.push(`${i}:00`)
  }

  if (end.slice(3, 5) !== '00') {
    hoursArray.push(`${convertedEnd + 1}:00`)
  }

  /*  hoursArray.push(`${convertedEnd}:00`) */

  return hoursArray
}

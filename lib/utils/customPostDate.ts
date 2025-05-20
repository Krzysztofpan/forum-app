import {
  formatDistanceToNow,
  differenceInHours,
  format,
  getYear,
  FormatDistanceFnOptions,
} from 'date-fns'
import { enUS } from 'date-fns/locale'

// Niestandardowy locale do skróconego formatu czasu (max do 24h)
const customLocale = {
  ...enUS,
  formatDistance: (
    token: string,
    count: number,
    options: FormatDistanceFnOptions | undefined
  ) => {
    switch (token) {
      case 'lessThanXSeconds':
      case 'xSeconds':
        return `${count}s${
          options?.addSuffix ? (options.comparison! > 0 ? ' in' : ' ago') : ''
        }`
      case 'halfAMinute':
        return `30s${
          options?.addSuffix ? (options.comparison! > 0 ? ' in' : ' ago') : ''
        }`
      case 'lessThanXMinutes':
      case 'xMinutes':
        return `${count}m${
          options?.addSuffix ? (options.comparison! > 0 ? ' in' : ' ago') : ''
        }`
      case 'aboutXHours':
      case 'xHours':
        return `${count}h${
          options?.addSuffix ? (options.comparison! > 0 ? ' in' : ' ago') : ''
        }`
      default:
        return ''
    }
  },
}

export function formatPostTime(postDate: Date) {
  const now = new Date()
  const hoursDiff = differenceInHours(now, postDate)

  if (hoursDiff < 24) {
    // Skrócony czas do 24h
    return formatDistanceToNow(postDate, {
      locale: customLocale,
    })
  } else {
    // Po 24h - format daty
    const currentYear = getYear(now)
    const postYear = getYear(postDate)

    // Format skróconej nazwy miesiąca i dnia
    let dateFormat = 'MMM d'

    // Jeśli post z innego roku, dodajemy rok po przecinku
    if (postYear !== currentYear) {
      dateFormat += ', yyyy'
    }

    return format(postDate, dateFormat, { locale: enUS })
  }
}

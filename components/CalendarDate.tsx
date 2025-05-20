import { format } from 'date-fns'
import { enUS } from 'date-fns/locale'
import { Calendar } from 'lucide-react'

const CalendarDate = ({ date }: { date: Date }) => {
  const formattedDate = format(date, 'MMMM yyyy', { locale: enUS })
  return (
    <p className="text-foreground/50 font-thin flex gap-1 items-center my-3">
      <Calendar size={17} /> Joined {formattedDate}
    </p>
  )
}

export default CalendarDate

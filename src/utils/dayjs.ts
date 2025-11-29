import $_dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

$_dayjs.extend(utc)
$_dayjs.extend(timezone)

/**
 * Dayjs instance
 */
export const dayjs = $_dayjs

/**
 * date patterns
 */
export const dayPatterns = {
  date: 'YYYY-MM-DD',
  datetime: 'YYYY-MM-DD HH:mm:ss',
}

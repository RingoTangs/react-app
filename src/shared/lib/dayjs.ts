import $_dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

$_dayjs.extend(utc)
$_dayjs.extend(timezone)

/**
 * 已配置 UTC 和时区插件的 Day.js 实例。
 */
export const dayjs = $_dayjs

/**
 * 常用日期格式。
 */
export const dayPatterns = {
  date: 'YYYY-MM-DD',
  datetime: 'YYYY-MM-DD HH:mm:ss',
}

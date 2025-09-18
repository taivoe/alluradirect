import advancedFormat from 'dayjs/plugin/advancedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

/** dayjs needs to be initialized in every project it is used in
 *  importing this file should setup dayjs with the required extensions + timezone
 */
export function dayjsInitializer() {
  dayjs.extend(advancedFormat);
  dayjs.extend(utc);
  dayjs.extend(customParseFormat);
  dayjs.extend(relativeTime);
  dayjs.extend(timezone);
}

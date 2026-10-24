/**
 * Utility to calculate salon opening status according to Indian Standard Time (IST / UTC+05:30)
 */

import { businessConfig } from '../config/businessConfig';

export function getSalonCurrentStatus(customDate = null) {
  // Get time in IST (Asia/Kolkata)
  const now = customDate ? new Date(customDate) : new Date();

  // Convert to IST timestamp
  const istFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kolkata',
    hour12: false,
    weekday: 'long',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  });

  const parts = istFormatter.formatToParts(now);
  const partMap = {};
  parts.forEach(p => {
    partMap[p.type] = p.value;
  });

  const weekdayName = partMap.weekday; // e.g., 'Monday'
  const currentHour = parseInt(partMap.hour, 10);
  const currentMinute = parseInt(partMap.minute, 10);
  const currentTimeInMinutes = currentHour * 60 + currentMinute;

  // Find schedule for today
  const schedule = businessConfig.openingHours.schedule.find(s =>
    s.days.includes(weekdayName)
  );

  if (!schedule) {
    return {
      isOpen: false,
      statusText: 'Closed today',
      badgeClass: 'status-closed',
      nextOpening: 'Please check schedule'
    };
  }

  const openTimeInMinutes = schedule.openHour * 60 + schedule.openMinute;
  const closeTimeInMinutes = schedule.closeHour * 60 + schedule.closeMinute;

  if (currentTimeInMinutes >= openTimeInMinutes && currentTimeInMinutes < closeTimeInMinutes) {
    // Salon is currently open
    const closeDisplay = schedule.closeHour > 12 ? `${schedule.closeHour - 12}:00 PM` : `${schedule.closeHour}:00 AM`;
    return {
      isOpen: true,
      statusText: `Open Now · Until ${closeDisplay}`,
      badgeClass: 'status-open',
      todaySchedule: schedule.time,
      isClosingSoon: (closeTimeInMinutes - currentTimeInMinutes) <= 60
    };
  } else if (currentTimeInMinutes < openTimeInMinutes) {
    // Opens later today
    const openDisplay = `${schedule.openHour}:00 AM`;
    return {
      isOpen: false,
      statusText: `Closed · Opens today at ${openDisplay}`,
      badgeClass: 'status-closed',
      todaySchedule: schedule.time
    };
  } else {
    // Closed for today, opens next morning at 9:00 AM
    return {
      isOpen: false,
      statusText: 'Closed · Opens tomorrow at 9:00 AM',
      badgeClass: 'status-closed',
      todaySchedule: schedule.time
    };
  }
}

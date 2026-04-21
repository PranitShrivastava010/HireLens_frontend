import { differenceInCalendarDays } from "date-fns";

export function getJobAgeLabel(job) {
  const baseDate = job.postedAtUtc;

  if (!baseDate) return null;

  const days = differenceInCalendarDays(new Date(), new Date(baseDate));

  if (days <= 0) return "Today";
  if (days === 1) return "1 day ago";
  return `${days} days ago`;
}

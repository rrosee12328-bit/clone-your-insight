// All April 2026 Thursdays at 7pm CST (UTC-6) = 1am UTC next day
const APRIL_WEBINAR_DATES = [
  new Date("2026-04-03T01:00:00Z"), // April 2
  new Date("2026-04-10T01:00:00Z"), // April 9
  new Date("2026-04-17T01:00:00Z"), // April 16
  new Date("2026-04-24T01:00:00Z"), // April 23
  new Date("2026-05-01T01:00:00Z"), // April 30
];

// Returns the next upcoming webinar date, or the last one if all have passed
export function getNextWebinarDate(): Date {
  const now = new Date();
  return APRIL_WEBINAR_DATES.find((d) => d.getTime() > now.getTime()) ?? APRIL_WEBINAR_DATES[APRIL_WEBINAR_DATES.length - 1];
}

export const WEBINAR_DATE = getNextWebinarDate();

export const WEBINAR_TITLE = "Clone Yourself with AI";
export const WEBINAR_SUBTITLE = "How to Leverage What You Already Know — Without the Overwhelm";
export const WEBINAR_DURATION_MINUTES = 90;

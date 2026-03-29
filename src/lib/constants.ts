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

export const WEBINAR_TITLE = "CLONE YOURSELF: 5 Costly AI Mistakes That Are Costing You Time, Money, and Opportunity";
export const WEBINAR_SUBTITLE = "Whether you're building a business, growing a brand, or trying to turn what you know into income — this live training reveals the 5 common AI mistakes holding you back and shows you the exact framework to multiply what you already have into real results.";
export const WEBINAR_DURATION_MINUTES = 90;

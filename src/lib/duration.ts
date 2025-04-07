import { type Duration, formatDuration } from "date-fns";

/**
 * Format an ISO 8601 duration string to hh:mm:ss
 *
 * @param isoDuration - The ISO 8601 duration string to format
 * @param options - Options to customize the output
 * @param options.alwaysIncludeHours - Whether to always include hours in the output
 * @returns The formatted duration string
 *
 * @example
 * ```ts
 * formatIsoDuration("PT1H"); // "01:00:00"
 * formatIsoDuration("PT0H3M2S"); // "03:02"
 * formatIsoDuration("PT0H3M2S", { alwaysIncludeHours: true }); // "00:03:02"
 * ```
 */
function formatIsoDuration(
  isoDuration: string,
  options: {
    alwaysIncludeHours?: boolean;
  } = {}
): string {
  // Regex to determine if the provided string is a valid ISO 8601 duration and extract the components
  const regex =
    /P(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)D)?T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
  const matches = isoDuration.match(regex);

  // Check if `isoDuration` is a valid ISO 8601 duration
  if (!matches) {
    throw new Error("Invalid ISO 8601 duration format: " + isoDuration);
  }

  // Extract hours, minutes, and seconds
  const hours = matches[4] ? parseInt(matches[4]) : 0;
  const minutes = matches[5] ? parseInt(matches[5]) : 0;
  const seconds = matches[6] ? parseInt(matches[6]) : 0;

  // Decide whether to include hours in the output
  const includeHours = hours > 0 || options.alwaysIncludeHours;

  let formattedParts = [];

  // Only include hours if they are greater than 0 or if `alwaysIncludeHours` is true
  if (includeHours) {
    formattedParts.push(hours.toString().padStart(2, "0"));
  }

  // Always include minutes and seconds for consistency
  formattedParts.push(minutes.toString().padStart(2, "0"));
  formattedParts.push(seconds.toString().padStart(2, "0"));

  // Format to hh:mm:ss
  return formattedParts.join(":");
}

type DurationComponents = {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

/**
 * Sums a list of ISO 8601 durations.
 *
 * @param durations - A list of ISO 8601 durations.
 * @returns The sum of the durations as an ISO 8601 duration string.
 *
 * @example
 * ```ts
 * sumIsoDurations(["PT1H", "PT2H"]); // "PT3H"
 * sumIsoDurations(["PT1H", "PT2H", "PT3H"]); // "PT6H"
 * sumIsoDurations(["P1D", "P2D"]); // "P3D"
 * sumIsoDurations(["P1D", "P2D", "P3D"]); // "P6D"
 * sumIsoDurations(["P1D", "P2D", "PT1H"]); // "P3DT1H"
 * ```
 */
function sumIsoDurations(durations: string[]): string {
  const totalDuration: DurationComponents = {
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  // Regular expression for parsing ISO 8601 duration
  const regex =
    /P(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)D)?T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;

  durations.forEach((isoDuration) => {
    const matches = isoDuration.match(regex);
    if (!matches) {
      throw new Error("Invalid ISO 8601 duration format: " + isoDuration);
    }

    // Accumulate the duration components
    totalDuration.years += matches[1] ? parseInt(matches[1]) : 0;
    totalDuration.months += matches[2] ? parseInt(matches[2]) : 0;
    totalDuration.days += matches[3] ? parseInt(matches[3]) : 0;
    totalDuration.hours += matches[4] ? parseInt(matches[4]) : 0;
    totalDuration.minutes += matches[5] ? parseInt(matches[5]) : 0;
    totalDuration.seconds += matches[6] ? parseInt(matches[6]) : 0;
  });

  // Handle overflow for minutes and seconds
  totalDuration.minutes += Math.floor(totalDuration.seconds / 60);
  totalDuration.seconds %= 60;

  totalDuration.hours += Math.floor(totalDuration.minutes / 60);
  totalDuration.minutes %= 60;

  // Construct the total duration as an ISO 8601 string
  let result = "P";
  if (totalDuration.years) result += `${totalDuration.years}Y`;
  if (totalDuration.months) result += `${totalDuration.months}M`;
  if (totalDuration.days) result += `${totalDuration.days}D`;
  if (totalDuration.hours || totalDuration.minutes || totalDuration.seconds) {
    result += "T";
    if (totalDuration.hours) result += `${totalDuration.hours}H`;
    if (totalDuration.minutes) result += `${totalDuration.minutes}M`;
    if (totalDuration.seconds) result += `${totalDuration.seconds}S`;
  }

  return result;
}

/**
 * Converts an ISO 8601 duration string to a date-fns Duration object.
 *
 * @param isoDuration - The ISO 8601 duration string.
 * @returns A date-fns `Duration` object.
 */
function isoDurationToDateFnsDuration(isoDuration: string): Duration {
  // Regular expression to parse ISO 8601 duration
  const regex =
    /P(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)W)?(?:(\d+)D)?T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
  const matches = isoDuration.match(regex);

  if (!matches) {
    throw new Error("Invalid ISO 8601 duration format");
  }

  // Creating a Duration object with extracted values or defaulting to 0
  const duration: Duration = {
    years: matches[1] ? parseInt(matches[1]) : 0,
    months: matches[2] ? parseInt(matches[2]) : 0,
    weeks: matches[3] ? parseInt(matches[3]) : 0,
    days: matches[4] ? parseInt(matches[4]) : 0,
    hours: matches[5] ? parseInt(matches[5]) : 0,
    minutes: matches[6] ? parseInt(matches[6]) : 0,
    seconds: matches[7] ? parseInt(matches[7]) : 0,
  };

  return duration;
}

export {
  formatDuration,
  formatIsoDuration,
  isoDurationToDateFnsDuration,
  sumIsoDurations,
};

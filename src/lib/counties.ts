export const KENYA_COUNTIES = [
  "Nairobi",
  "Mombasa",
  "Kisumu",
  "Nakuru",
  "Eldoret",
  "Kiambu",
  "Machakos",
  "Kajiado",
  "Nyeri",
  "Meru",
  "Kakamega",
  "Thika",
  "Malindi",
  "Kitale",
  "Garissa",
  "Other",
] as const;

export type KenyaCounty = (typeof KENYA_COUNTIES)[number];

export function isNairobiCounty(county: string): boolean {
  return county.toLowerCase() === "nairobi";
}

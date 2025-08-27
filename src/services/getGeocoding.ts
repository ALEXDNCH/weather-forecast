import axios from "axios";
import type { IGeoResult } from "@/types";
import { GEOCODING_WEATHER_API_URL } from "@/services";

// method for getting geo by city
export async function getGeocoding(searchName: string): Promise<IGeoResult | null> {
  const response = await axios.get<{ results?: IGeoResult[] }>(
    `${GEOCODING_WEATHER_API_URL}/search?name=${encodeURIComponent(searchName)}`,
  );

  return response.data?.results?.[0] ?? null;
}

export type TOption = { value: string; label: string };

export const FAVORITE_CITIES = [
  { value: "Moscow", label: "Москва" },
  { value: "Krasnodar", label: "Краснодар" },
  { value: "Kazan", label: "Казань" },
  { value: "Ufa", label: "Уфа" },
  { value: "Novosibirsk", label: "Новосибирск" },
  { value: "Krasnoyarsk", label: "Красноярск" },
] as const satisfies readonly TOption[];

export type FavoriteCityValue = (typeof FAVORITE_CITIES)[number]["value"];
export type FavoriteCityLabel = (typeof FAVORITE_CITIES)[number]["label"];

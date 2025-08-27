type BaseOption = { value: string; label: string };

export const FAVORITE_CITIES = [
  { value: "Moscow", label: "Москва" },
  { value: "Krasnodar", label: "Краснодар" },
  { value: "Kazan", label: "Казань" },
  { value: "Ufa", label: "Уфа" },
  { value: "Novosibirsk", label: "Новосибирск" },
  { value: "Krasnoyarsk", label: "Красноярск" },
  { value: "Seoul", label: "Сеул" },
] as const satisfies readonly BaseOption[];

export type FavoriteCityOption = (typeof FAVORITE_CITIES)[number];
export type FavoriteCityValue = FavoriteCityOption["value"];
export type FavoriteCityLabel = FavoriteCityOption["label"];

export type TOption = FavoriteCityOption;

export type WeatherInfo = {
  description: string;
  icon: string;
};

export const WEATHER_CODES: Record<number, WeatherInfo> = {
  // Ясно / солнечно
  0: { description: "Солнечно", icon: "sun.svg" },
  1: { description: "Солнечно", icon: "sun.svg" },
  2: { description: "Солнечно", icon: "sun.svg" },

  // Облачно
  3: { description: "Облачно", icon: "cloud.svg" },
  45: { description: "Облачно", icon: "cloud.svg" },
  48: { description: "Облачно", icon: "cloud.svg" },

  // Дождливо
  51: { description: "Дождливо", icon: "rain.svg" },
  53: { description: "Дождливо", icon: "rain.svg" },
  55: { description: "Дождливо", icon: "rain.svg" },
  61: { description: "Дождливо", icon: "rain.svg" },
  63: { description: "Дождливо", icon: "rain.svg" },
  65: { description: "Дождливо", icon: "rain.svg" },
  80: { description: "Дождливо", icon: "rain.svg" },
  81: { description: "Дождливо", icon: "rain.svg" },
  82: { description: "Дождливо", icon: "rain.svg" },

  // Снег, TODO потом поменять на snow, если будет картинка
  71: { description: "Снег", icon: "rain.svg" },
  73: { description: "Снег", icon: "rain.svg" },
  75: { description: "Снег", icon: "rain.svg" },
  77: { description: "Снег", icon: "rain.svg" },
  85: { description: "Снег", icon: "rain.svg" },
  86: { description: "Снег", icon: "rain.svg" },

  // Ветрено (нет прямого кода, поэтому условно мапим на сильный ветер)
  56: { description: "Ветрено", icon: "wind.svg" },
  57: { description: "Ветрено", icon: "wind.svg" },

  // Гроза, TODO потом поменять на thunderstorm.svg, если будет картинка
  95: { description: "Гроза", icon: "rain.svg" },
  96: { description: "Гроза", icon: "rain.svg" },
  99: { description: "Гроза", icon: "rain.svg" },
};

/// <reference types="vite-svg-loader" />

// общий случай: все .svg модули
declare module "*.svg" {
  const src: string;
  export default src;
}

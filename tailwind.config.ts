import type { Config } from "tailwindcss";

import daisyui, { type Config as DaisyuiConfig } from "daisyui";

export default {
  content: ["src/**/*.{ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: false,
    darkTheme: "dark",
    base: true,
    styled: true,
    utils: true,
    rtl: false,
    prefix: "",
    logs: true,
  },
} satisfies Config & { daisyui: DaisyuiConfig };

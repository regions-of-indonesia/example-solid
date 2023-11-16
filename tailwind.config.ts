import type { Config } from "tailwindcss";

import forms from "@tailwindcss/forms";

import coloradix, { gray, violet, red, green, yellow, blue } from "@coloradix/tailwindcss";

const radix = coloradix({
  gray,
  violet,
  red,
  green,
  yellow,
  blue,
})
  .alias({
    neutral: "gray",
    primary: "violet",
    error: "red",
    success: "green",
    warning: "yellow",
    info: "blue",
  })
  .build();

export default {
  content: ["src/**/*.{ts,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      ...radix.colors,
    },
  },
  plugins: [radix.plugin, forms()],
} satisfies Config;

// Tailwind preset for MediPulse, shared by NativeWind (apps/mobile) and the doctor web app later.
const { colors } = require('./colors');
const { webFontStacks } = require('./fonts');
const { radii } = require('./radii');

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors,
      // Web only. In the mobile app, set fonts through the Text component, which picks the
      // family for the current language and weight.
      fontFamily: webFontStacks,
      borderRadius: Object.fromEntries(Object.entries(radii).map(([k, v]) => [k, `${v}px`])),
    },
  },
};

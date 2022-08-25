const typographyStyles = require("@tailwindcss/typography/src/styles");

const typographyTypes = ["DEFAULT", "base", "xl", "2xl", "sm"];
const typographyMap = {
  caption: '[data-tailwind-camouflage="figure"]',
  "figure > *": '[data-tailwind-camouflage="figure"] > *',
  figcaption: '[data-tailwind-camouflage="figcaption"]',
};

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./content/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      typography: (() => {
        const styles = {};
        typographyTypes.forEach(type => {
          const css = {};
          Object.entries(typographyMap).forEach(([key, value]) => {
            if (typographyStyles[type].css[0][key]) {
              css[value] = typographyStyles[type].css[0][key];
            }
          });
          styles[type] = { css };
        });
        return styles;
      })(),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

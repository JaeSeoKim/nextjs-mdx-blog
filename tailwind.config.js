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
    "./components/**/*.{js,ts,jsx,tsx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      typography: (theme => {
        const styles = { DEFAULT: {} };
        typographyTypes.forEach(type => {
          const css = {};
          Object.entries(typographyMap).forEach(([key, value]) => {
            if (typographyStyles[type].css[0][key]) {
              css[value] = typographyStyles[type].css[0][key];
            }
          });
          styles[type] = { css, ...styles[type] };
        });
        return styles;
      })(),
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
    function ({ addVariant }) {
      addVariant(
        "supports-backdrop-blur",
        "@supports (backdrop-filter: blur(0)) or (-webkit-backdrop-filter: blur(0))"
      );
      addVariant("children", "& > *");
    },
  ],
};

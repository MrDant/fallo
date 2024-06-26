export default {
  safelist: ["-mt-4"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Lato",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
      colors: {
        tangaroa: {
          50: "#eaf8ff",
          100: "#d0eeff",
          200: "#aae4ff",
          300: "#70d5ff",
          400: "#2ebaff",
          500: "#0093ff",
          600: "#006bff",
          700: "#0051ff",
          800: "#0043de",
          900: "#003fad",
          950: "#021943",
          DEFAULT: "#021943",
        },
        heather: {
          50: "#f6f7f8",
          100: "#e9ecf0",
          200: "#d9dee4",
          300: "#c2cbd4",
          400: "#9fadbb",
          500: "#8895a9",
          600: "#76829a",
          700: "#6a748b",
          800: "#596174",
          900: "#4a505e",
          950: "#30333b",
          DEFAULT: "#C2CBD4",
        },
        kabul: {
          50: "#f6f3f0",
          100: "#e7e3da",
          200: "#d1c7b7",
          300: "#b7a58d",
          400: "#a2896d",
          500: "#93795f",
          600: "#7e6350",
          700: "#685044",
          800: "#57433c",
          900: "#4c3c37",
          950: "#2b1f1d",
          DEFAULT: "#685044",
        },
        "maroon-flush": {
          50: "#fef2f3",
          100: "#fce7e8",
          200: "#f9d2d8",
          300: "#f4adb7",
          400: "#ed7f90",
          500: "#e2516c",
          600: "#cd3155",
          700: "#ab2346",
          800: "#912040",
          900: "#7c1f3d",
          950: "#450c1d",
          DEFAULT: "#AB2346",
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".scrollbar-hide": {
          /* Hide scrollbar for Chrome, Safari and Opera */
          "&::-webkit-scrollbar": {
            display: "none",
          },
          /* Hide scrollbar for IE, Edge and Firefox */
          "-ms-overflow-style": "none" /* IE and Edge */,
          "scrollbar-width": "none" /* Firefox */,
        },
      });
    },
  ],
};

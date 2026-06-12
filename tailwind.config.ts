const config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-heading)', 'serif'],
      },
      colors: {
        background: "#FAF8F5",
        foreground: "#3D2314",
        accent: "#9B6845",
        surface: "#F0E8DF",
        border: "#D9C9BB",
      },
    },
  },
  plugins: [],
};

export default config;
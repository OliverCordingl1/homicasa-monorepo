import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      typography: ({ theme }) => ({
        brand: {
          css: {
            "--tw-prose-body": theme("colors.surface.700"),
            "--tw-prose-headings": theme("colors.brand.900"),
            "--tw-prose-lead": theme("colors.surface.600"),
            "--tw-prose-links": theme("colors.accent.600"),
            "--tw-prose-links-hover": theme("colors.accent.700"),
            "--tw-prose-bold": theme("colors.brand.900"),
            "--tw-prose-counters": theme("colors.surface.600"),
            "--tw-prose-bullets": theme("colors.surface.400"),
            "--tw-prose-hr": theme("colors.surface.200"),
            "--tw-prose-quotes": theme("colors.surface.700"),
            "--tw-prose-quote-borders": theme("colors.accent.300"),
            "--tw-prose-captions": theme("colors.surface.500"),
            "--tw-prose-code": theme("colors.accent.700"),
            "--tw-prose-pre-code": theme("colors.surface.800"),
            "--tw-prose-pre-bg": theme("colors.surface.100"),
            "--tw-prose-th-borders": theme("colors.surface.300"),
            "--tw-prose-td-borders": theme("colors.surface.200"),

            h1: {
              fontWeight: "700",
              letterSpacing: "-0.02em",
            },
            h2: {
              fontWeight: "700",
              letterSpacing: "-0.01em",
              marginTop: "3rem",
              marginBottom: "1.25rem",
            },
            h3: {
              fontWeight: "600",
              marginTop: "2rem",
              marginBottom: "1rem",
            },
            p: {
              fontSize: "1.125rem",
              lineHeight: "1.9",
              marginTop: "1rem",
              marginBottom: "1rem",
            },
            a: {
              textDecoration: "none",
              "&:hover": { textDecoration: "underline" },
            },
            code: {
              backgroundColor: theme("colors.surface.100"),
              paddingLeft: "0.375rem",
              paddingRight: "0.375rem",
              paddingTop: "0.125rem",
              paddingBottom: "0.125rem",
              borderRadius: "0.375rem",
            },
            pre: {
              backgroundColor: theme("colors.surface.100"),
              border: `1px solid ${theme("colors.surface.200")}`,
              padding: "1rem",
              borderRadius: "0.5rem",
            },
            blockquote: {
              fontStyle: "italic",
              borderLeftColor: theme("colors.accent.300"),
            },
            hr: {
              borderColor: theme("colors.surface.200"),
              marginTop: "2rem",
              marginBottom: "2rem",
            },
            ul: {
              marginTop: "1.25rem",
              marginBottom: "1.25rem",
            },
            ol: {
              marginTop: "1.25rem",
              marginBottom: "1.25rem",
            },
            li: {
              marginTop: "0.5rem",
              marginBottom: "0.5rem",
            },
            table: {
              width: "100%",
            },
            thead: {
              borderBottomColor: theme("colors.surface.300"),
            },
            "tbody tr": {
              borderBottomColor: theme("colors.surface.200"),
            },
            img: {
              borderRadius: "0.5rem",
              border: `1px solid ${theme("colors.surface.200")}`,
            },
          },
        },
      }),
      colors: {
        brand: {
          50: "oklch(0.97 0.01 80)",
          100: "oklch(0.95 0.02 80)",
          200: "oklch(0.90 0.04 80)",
          300: "oklch(0.85 0.06 80)",
          400: "oklch(0.75 0.08 80)",
          500: "oklch(0.65 0.10 80)",
          600: "oklch(0.55 0.12 80)",
          700: "oklch(0.45 0.14 80)",
          800: "oklch(0.35 0.16 80)",
          900: "oklch(0.25 0.18 80)",
        },
        accent: {
          50: "oklch(0.97 0.02 30)",
          100: "oklch(0.95 0.04 30)",
          200: "oklch(0.90 0.08 30)",
          300: "oklch(0.85 0.12 30)",
          400: "oklch(0.75 0.16 30)",
          500: "oklch(0.65 0.20 30)",
          600: "oklch(0.55 0.24 30)",
          700: "oklch(0.45 0.28 30)",
          800: "oklch(0.35 0.32 30)",
          900: "oklch(0.25 0.36 30)",
        },
        surface: {
          50: "oklch(0.99 0.005 80)",
          100: "oklch(0.97 0.01 80)",
          200: "oklch(0.94 0.015 80)",
          300: "oklch(0.90 0.02 80)",
          400: "oklch(0.80 0.025 80)",
          500: "oklch(0.65 0.03 80)",
          600: "oklch(0.50 0.035 80)",
          700: "oklch(0.40 0.04 80)",
          800: "oklch(0.30 0.045 80)",
          900: "oklch(0.20 0.05 80)",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;

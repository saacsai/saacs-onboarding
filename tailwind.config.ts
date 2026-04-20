import type { Config } from 'tailwindcss'
import { colors, borderRadius } from './lib/design-tokens'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        saacs: {
          purple: colors.saacs.purple,
          teal: colors.saacs.teal,
        },
        tilapia: {
          dark: colors.tilapia.dark,
          darkAlt: colors.tilapia.darkAlt,
          light: colors.tilapia.light,
          lighter: colors.tilapia.lighter,
        },
        primary: colors.primary,
        secondary: colors.secondary,
        accent: colors.accent,
      },
      borderRadius: {
        sm: borderRadius.sm,
        md: borderRadius.md,
        lg: borderRadius.lg,
        xl: borderRadius.xl,
        '2xl': borderRadius['2xl'],
      },
      backgroundImage: {
        'gradient-saacs': `linear-gradient(135deg, ${colors.saacs.purple} 0%, ${colors.saacs.teal} 100%)`,
        'gradient-tilapia': `linear-gradient(135deg, ${colors.tilapia.dark} 0%, ${colors.tilapia.light} 100%)`,
      },
    },
  },
  plugins: [],
}
export default config

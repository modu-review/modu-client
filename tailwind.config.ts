import type {Config} from 'tailwindcss';

export default {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/views/**/*.{ts,tsx}',
    './src/features/**/*.{ts,tsx}',
    './src/widgets/**/*.{ts,tsx}',
    './src/shared/ui/**/*.{ts,tsx}',
    './src/shared/components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        lightBlue: '#BBE1FA',
        mediumBlue: '#3282B8',
        boldBlue: '#0F4C75',
        extraboldBlue: '#1B262C',
      },
    },
  },
  plugins: [],
} satisfies Config;

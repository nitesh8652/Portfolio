export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0A0A0A',
        surface: '#111111',
        line: '#1E1E1E',
        lime: '#C8FF00',
        hoverlime: '#A8E600',
        muted: '#888888'
      },
      fontFamily: {
        display: ['"Clash Display"', '"Cabinet Grotesk"', 'Arial', 'sans-serif'],
        body: ['"General Sans"', '"DM Sans"', 'Arial', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      },
      boxShadow: {
        glow: '0 0 32px rgba(200, 255, 0, 0.18)'
      }
    }
  },
  plugins: []
};

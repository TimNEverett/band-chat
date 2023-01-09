import plugin from 'tailwindcss/plugin'

export const rotateYPlugin = plugin(({ addUtilities }) => {
  const newUtilities = {
    '.rotate-y-180': {
      transform: 'rotateY(180deg)',
    },
  }

  addUtilities(newUtilities)
})

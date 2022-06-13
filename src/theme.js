const colors = {
  // black: '#000000',
  black: '#0a111f',
  blue: '#14213d',
  orange: '#fca311',
  gray: {
    50: '#e5e5e5',
    800: '#8697a2',
  },
  white: '#ffffff',

  red: '#e95659',
  green: {
    50: '#18dc6d',
    100: '#2ecc71',
  },
}

//             0  1  2  3   4   5   6    7    8
const space = [0, 4, 8, 16, 24, 32, 64, 128, 256, 512]

const fonts = {
  body: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, 'Apple Color Emoji', Arial, sans-serif, 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif;",
}

//0  1  2  3  4   5   6   7   8   9   10  11  12   13  14
const fontSizes = [
  0, 5, 7, 9, 12, 14, 16, 21, 28, 37, 50, 67, 89, 119, 159,
].map((n) => `${n / 10}rem`)

const fontWeights = [0, 300, 400, 500, 600, 700]

const theme = {
  colors,
  space,
  fonts,
  fontSizes,
  fontWeights,
}

export default theme

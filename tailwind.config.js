//process.env.NODE_ENV = 'production'
process.env.NODE_ENV = 'development'
console.log('env', process.env.NODE_ENV)
module.exports = {
  purge: [
    './public/index.html',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
const fs = require('fs')
const data = fs.readFileSync('/Users/helin/Downloads/eb956b240f9a8796032e59a55d6e8e4e.png')

fs.writeFileSync('./test.png', data, {
  encoding: 'utf8',
})
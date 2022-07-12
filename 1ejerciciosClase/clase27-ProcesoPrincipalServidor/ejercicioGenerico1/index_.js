const parseArgs = require('minimist')

const options = {default: {m: 'modo', puerto: 8080, debug: false}}

console.log(parseArgs(process.argv.slice(2), options))

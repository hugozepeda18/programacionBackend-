const parseArgs = require('minimist')

const options = {alias: {p: 'puerto', d: 'debug', m: 'modo'}, default: {puerto: '8080'}}

console.log(parseArgs(process.argv.slice(2), options))

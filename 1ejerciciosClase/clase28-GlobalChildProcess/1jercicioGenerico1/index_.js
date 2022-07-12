console.log('Hola')
console.log('Mundo')

process.on('beforeExit', () => {
    console.log('Adiós Mundo')
})
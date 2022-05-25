process.on('exit', () => {
    console.log('codigo: ' + codigoError)
})

let codigoError = 0

const args = process.argv.slice(2).sort((a,b) => {return a-b})
console.log(args)

if(args.length == 0){
    const objeto = {error: { descripción: 'entrada vacía'} }
    codigoError = -4
    console.log(objeto)
    process.exit()
}

let error = false

const arrTPD = args.map(elemento => {
    if(isNaN(parseInt(elemento))){
        error = true
        return 'String'
    } else {
        return typeof(parseInt(elemento))
    }
})

console.log(error)

if(error){
    const objeto = {error: {descripción: 'error tipos de datos', numeros: args, tipos: arrTPD}}
    codigoError = -5
    console.log(objeto)
} else {

    let suma = 0

    args.forEach(elemento => {
        suma += parseInt(elemento) 
    })

    const objeto = {
        datos: {
            numeros: args,
            promedio: suma/args.length,
            max: args[args.length - 1],
            min: args[0],
            ejecutable: process.title,
            pid: process.pid
        }
    }

    console.log(objeto)
}
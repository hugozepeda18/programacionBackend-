process.on('message', msg => {
    console.log(`Numbers to generate: ${msg}`)
    let arreglo = []
    const numbers = parseInt(msg)
    const max = 1000
    for(let i=0; i < numbers;i++){
        arreglo.push(Math.floor(Math.random() * max) + 1)
    }
    arreglo.sort((a,b) => {return a-b})
    const obj = {}
    let number = 0
    for(let j=0; j < numbers ; j++){
        number++
        for(let k=1; k < numbers ; k++){
            if(arreglo[j] == arreglo[k]){
                number++
            } else {
                break
            }
        }
        obj[arreglo[j]] = number
        number = 0
    }
    process.send(obj)
    process.exit()
})

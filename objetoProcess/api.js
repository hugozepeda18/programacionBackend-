const express = require("express")

const { Router } = express

const router = Router()

router.get('/randoms/:id', (req, res) => {
    let numbers = parseInt(req.params.id)
    if(numbers == null){
        numbers = 100000000
    }
    let arreglo = []
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
    res.send({numero: numbers, numeros: arreglo, contador: obj})
})

module.exports = router
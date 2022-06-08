const express = require("express")
const parseArgs = require('minimist')
const { Router } = express

const router = Router()

const { fork } = require('child_process')

router.get('/randoms/:id', (req, res) => {
    let numbers = parseInt(req.params.id)
    if(numbers == null){
        numbers = 100000000
    }
    obj = {}
    const forked = fork('./child.js')
    forked.send(numbers)
    forked.on('message', msg => {
        console.log(msg)
        obj = msg
    })
    res.send({contador: obj})
})

module.exports = router
import express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
    res.send({message: 'This is working'})
})

export default router
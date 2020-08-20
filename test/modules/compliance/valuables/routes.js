const router = require('express').Router()

router.get('/accounts', (req, res) => {
    res.send(`${req.path}`)
})

router.get('/assets', (req, res) => {
    res.send(`${req.path}`)
})

module.exports = router
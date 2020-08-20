const router = require('express').Router()

router.get('/', (req, res) => {
    res.send(`${req.path}`)
})

module.exports = router
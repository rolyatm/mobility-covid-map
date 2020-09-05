const Router = require('express-promise-router')
const db = require('../db')

// add support for async
const router = new Router()

module.exports = router

router.get('/', async (req, res) => {
    const rows = await db.query(`
        SELECT * 
        FROM county_mobility_covid
        WHERE record_date = (SELECT MAX(record_date) FROM county_mobility_covid);`)
    //console.log(rows)
    res.send(db.validate_response(rows))
})
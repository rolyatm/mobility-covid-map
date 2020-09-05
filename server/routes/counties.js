const Router = require('express-promise-router')
const db = require('../db')

// add support for async
const router = new Router()

module.exports = router

router.get('/:county', async (req, res) => {
    const { county } = req.params
    const rows = await db.query(      
        `SELECT record_date, retail_and_recreation, grocery_and_pharmacy, parks, transit_stations,
        workplaces, residential, total_population, active_cases, deaths
        FROM county_mobility_covid
        WHERE fips_string=$1 
        ORDER BY record_date`,
        [req.params.county]
    )
    //console.log(rows)
    res.send(db.validate_response(rows))
})
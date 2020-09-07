const Router = require('express-promise-router')
const db = require('../db')

// add support for async
const router = new Router()

module.exports = router

router.get('/maps', async (req, res) => {
    const rows = await db.query(`
        SELECT record_date, fips, state, county, workplaces, residential, active_cases/(total_population/10000.0) as cases_per_10k, deaths/(total_population/10000.0) as deaths_per_10k
        FROM county_covid_mobility
        WHERE record_date IN (SELECT MAX(record_date) FROM county_covid_mobility where residential is not null);`)
    //console.log(rows)
    res.send(db.validate_response(rows))
})

router.get('/counties/:county', async (req, res) => {
    const { county } = req.params
    const rows = await db.query(      
        `SELECT record_date, workplaces, residential, active_cases/(total_population/10000.0) as cases_per_10k, deaths/(total_population/10000.0) as deaths_per_10k
        FROM county_covid_mobility
        WHERE fips=$1 
        ORDER BY record_date`,
        [req.params.county]
    )
    //console.log(rows)
    res.send(db.validate_response(rows))
})

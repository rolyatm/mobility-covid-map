const maps = require('./maps.js')
const counties = require('./counties.js')

module.exports = app => {
    app.use('/api/maps', maps)
    app.use('/api/counties', counties)
}
const data = require('./data.js')
module.exports = app => {
    app.use('/api', data)
}
var app = require('./app/config/server')
const urls = require('./app/config/url')
require('dotenv').config()
require('./app/config/database')

const port = process.env.PORT || 3030

urls.addURLs(app)

app.listen(port, (err) => {
    if (err){
        console.log('error: ' + err)
    } else {
        console.log(`Server running on port: ${port}`)
    }
})

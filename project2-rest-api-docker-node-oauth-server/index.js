// Server Connection
const PORT = 8080

// Database Connection
const sqlcn = require('./dbHelpers/mySqlWrapper')

// This handles all of the database operations relating to saving and retrieving oAuth2 bearer tokens
const bearerTokensDBHelper = require('./dbHelpers/userDBHelper', sqlcn)

// this handles all of the database operations relating to users such as registering and retrieving them
const userDBHelper = require('./dbHelpers/userDBHelper', sqlcn)

const bodyParser = require('body-parser')
const express = require('express')
const expressApp = express() 

/* We require the node-oauth2-server library */
const oAuth2Server = require('node-oauth2-server')

/* Here we instantiate the model we just made and inject the dbHelpers we use in it */
const oAuthModel = require('./authorisation/accessTokenModel') (userDBHelper, bearerTokensDBHelper)

/* Now we instantiate the oAuth2Server and pass in an object which tells
the the password library that we're using the password  grant type and
give it the model we just required. */
expressApp.oauth = oAuth2Server({
    model: oAuthModel,
    grants: ['password'],
    debug: true
})


/* Here we require the authRoutesMethods object from the module
 that we just made */
 const authRoutesMethods = require('./authorisation/authRoutesMethods') (userDBHelper)

/* Now we instantiate the authRouter module and inject all
of its dependencies. */
const authRouter = require('./authorisation/authRouter') (express.Router(), expressApp, authRoutesMethods)

/* Here we asign the authRouter as middleware in the express app.
By doing this all request sent to routes that start with /auth
will be handled by this router*/
expressApp.use('/auth', authRouter)

/* Setup the oAuth error handling */
expressApp.use(expressApp.oauth.errorHandler())

// Setup the oAuth error handling
expressApp.use(expressApp.oath.errorHandler())

// set the bodyParser to parse the urlencoded post data
expressApp.use(bodyParser.urlencoded({ extended: true}))

expressApp.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})

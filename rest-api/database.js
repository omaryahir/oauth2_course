const Sequelize = require('sequelize')
const finale = require('finale-rest')
const http = require('http')

// Connect to database
const database = new Sequelize({
  dialect: 'sqlite',
  storage: './test.sqlite',
  operatorAliases: false
})

// Define the model 
const Part = database.define('parts', {
  partNumber: Sequelize.STRING,
  modelNumber: Sequelize.STRING,
  name: Sequelize.STRING,
  description: Sequelize.TEXT
})

// Initialize server 
const initializeDatabase = async (app) => {
  finale.initialize({ app, sequelize: database })
  finale.resource({
    model: Part,
    endpoints: ['/parts', '/parts/:id']
  })

  await database.sync()
}

module.exports = initializeDatabase

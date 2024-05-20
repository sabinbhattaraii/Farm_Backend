import Sequelize  from 'sequelize';


// Databasename,username,password,host,dialect
export const sequelize = new Sequelize('farm','postgres', 'pass1234', {
    host: 'localhost',
    dialect: 'postgres'
})
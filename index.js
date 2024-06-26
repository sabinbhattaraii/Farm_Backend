import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { port,apiVersion,staticFolder } from './config/sconfig.js'
import apiRouter from './routes/index.js';
import { sequelize } from './connectDb/dbPostgres.js';
// import "./models/schema/associations.js";

const app = express()

//cors to let browser access the hosted backend
app.use(cors({
    origin : '*',
    methods : 'GET, POST, PUT, PATCH, DELETE',
    credentials : true
}));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended : false
}))

app.use(`${apiVersion}`,apiRouter)

//for static files serving
app.use(express.static(staticFolder));

app.get('/',(req,res)=> {
    res.send('HomePage')
})

const initApp = async() => {
    console.log("Testing the database connection...");
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
        /**
         * Start the web server on the specified port.
         */
        // await sequelize.sync({ alter: true });
        app.listen(port,() => {
            console.log(`Server is running at: http://localhost:${port}`);
        })
    } catch (error) {
        console.error("Unable to connect to the database:",error);
    }
}

initApp()
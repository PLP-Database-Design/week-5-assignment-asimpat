const express = require('express');
const app = express();
const mysql = require('mysql2');
const dotenv = require('dotenv');
const cors = require('cors');


app.use(express());
dotenv.config();
app.use(cors());


const db = mysql.createConnection({
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    user: process.env.DB_USERNAME,
    database: process.env.DB_NAME
})

db.connect((err) => {
    if (err) {
        console.log('Error occur in connecting MYSQL');
    }

    console.log('mySql connected on', db.threadId);
    
})

// Question 1 
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

app.get('/patients', (req, res) => {
        // retrive the patients from the database
        db.query('SELECT * FROM patients', (err, results) => {
            if (err) {
                console.log(err);
                res.status(500).send('Error retriving patients')
            }else{
                // display the result to the browser
                res.render('patients', {results:results});
            }
        })
})

// Question 2 
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

app.get('/providers', (req, res) => {
        // retrive the providers from the database
        db.query('SELECT * FROM providers', (err, results) => {
            if (err) {
                console.log(err);
                res.status(500).send('Error retriving providers');
            }else{
                // display the result to the browser
                res.render('providers', {results:results});
            }
        })
})

// Question 3 
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.get('/patients/first', (req, res) => {
        // retrive the patients by firstName from the database
        db.query('SELECT * FROM patients ORDER BY first_name', (err, results) => {
            if (err) {
                console.log(err);
                res.status(500).send('Error retriving patients by firstName')
            }else{
                // display the result to the browser
                res.render('patients', {results:results});
            }
        })
})

// Question 4
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.get('/providers/specialty', (req, res) => {
        // retrive the providers by Specialty from the database
        db.query('SELECT * FROM providers ORDER BY provider_specialty', (err, results) => {
            if (err) {
                console.log(err);
                res.status(500).send('Error retriving  providers by specialty');
            }else{
                // display the result to the browser
                res.render('providers', {results:results});
            }
        })
})


const port = process.env.PORT
app.listen(port, () => {
    console.log(`server is runnig on http://localhost:${port}`);

    app.get('/', (req, res) => {
        res.send('response has been sent, server running sucessfully');
    })
})

const express = require('express');
const app = express();
app.use(express.static('label/styles'))
app.use(express.static('label/images'))
const sqlite3 = require('sqlite3').verbose();

//Connect to SQlite3 DB
//Use fakedata.db for tests, prod db never goes on GitHub
let db = new sqlite3.Database('SAVE_MATCHES.db', sqlite3.OPEN_READONLY, (err) => {
    if (err) {
        return console.log(err.message);
    }
    console.log('\nConnected to the SQlite database.\n');
});

app.get('/', (req, res) => {
	//We decided not to make this page live on BigRed.gifts
	//If we do next year we need to implement some security measures to avoid
	//	allowing addresses to be seen without secret url
	//Also in future ask matching team to collect address as two separate strings
	const netId = req.query.netId || ""
    if (netId != "") {
        let sql = 'SELECT * FROM info WHERE netId = ?';
        db.get(sql, [netId], (err, row) => {
            if (err) {
                return console.error(err.message);
            }
            res.send(
            `<!DOCTYPE html>
            <html>
            <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="stylesheet" type="text/css" href="labeldesign.css" media="all" />
            <link href="https://fonts.googleapis.com/css?family=Amita" rel="stylesheet">
            <title>LabelPrint</title>
            </head>

            <body>
              <div id="mylabel">
              <div id="text">
              <h1> Gift Exchange </h1>
              <ul> ${row.first_name} ${row.last_name} (${row.netId})
    		</br>
              ${row.address}
              </ul>

            <p id="personal_message"> </p>
            </div>

            <div id="picture">
            <img id="logo" alt="logo" src="logoblackandwhite.png"/>
            </div>
            </body>
            </html>`)
        })
    }
});

app.listen(3000, function() {
    console.log('Listening on port 3000! Go to http://www.localhost.com:3000/?netId=someId')
})

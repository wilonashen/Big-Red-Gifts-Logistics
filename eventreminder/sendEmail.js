//Helpful tutorial
//http://www.sqlitetutorial.net/sqlite-nodejs/connect/
const sqlite3 = require('sqlite3').verbose();
const nodemailer = require('nodemailer');

//Connect to SQlite3 DB
//Use ../fakedata.db for tests, prod db never goes on GitHub
let db = new sqlite3.Database('../SAVE_MATCHES.db', sqlite3.OPEN_READONLY, (err) => {
    if (err) {
        return console.log(err.message);
    }
    console.log('\nConnected to the SQlite database.\n');
});

//Email sign-in
//Must use eduroam. Off-campus wi-fi or CUVPN may not work
let transporter = nodemailer.createTransport({
    pool: true, // fixes mass email issue
    service: 'gmail',
    auth: {
        user: 'bigredgifts@gmail.com',
        pass: '** email password **'
    }
});

//Loop through every row
let sql = 'SELECT * FROM info WHERE ex_type="in person"';
db.each(sql, (err, row) => {
	if (err) {
		throw err;
	}
	let mailOptions = {
		from: '"Big Red Gifts" <bigredgifts@gmail.com>',
		to: row.match_id + '@cornell.edu',
		subject: '[Big Red Gifts] Event Reminder!',
		text: `Hi! Hope you all had a great Thanksgiving Break!

Reminder that Big Red Gifts is holding an event at Willard Straight Hall (Music Room WSH413) on Saturday Dec 2 from 6:30 - 8:00 pm.
This is a good opportunity to exchange your gift in-person. Snacks will be provided! We will also be playing short
holiday movies at the event so it'll be a good time. If you're busy on Saturday,
you can coordinate with your match to meet at a different time to exchange your gift.
Hope to see everyone there!

If you have any questions, don't hesitate to reach out by emailing us back or chatting us on Facebook.
(Sorry if you got this email already.)

Happy Gifting!
Big Red Gifts Team`
	};
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log(`Email sent: ${info.response} \t\t-- ${row.match_id} received info`);
        }
    });

});

//Close DB
db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('\nClosed the database connection.\n');
});

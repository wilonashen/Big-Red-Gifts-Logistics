//Helpful tutorial
//http://www.sqlitetutorial.net/sqlite-nodejs/connect/
const sqlite3 = require('sqlite3').verbose();
const nodemailer = require('nodemailer');

//Connect to SQlite3 DB
//Use ../fakedata.db for tests, prod db never goes on GitHub
let db = new sqlite3.Database('../prod-11-23-17-matching.db', sqlite3.OPEN_READONLY, (err) => {
    if (err) {
        return console.log(err.message);
    }
    console.log('\nConnected to the SQlite database.\n');
});

//Email sign-in
//Must use eduroam. Off-campus wi-fi or CUVPN may not work
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'bigredgifts@gmail.com',
        pass: '** email password **'
    }
});

//Loop through every row
//SMTP can handle only ~10 at a time
//Next year fix by implementing timeout?
let sql = 'SELECT * FROM info';
db.each(sql, (err, row) => {
	if (err) {
		throw err;
	}
	let mailOptions = {
		from: '"Big Red Gifts" <bigredgifts@gmail.com>',
		to: row.match_id + '@cornell.edu',
		subject: 'Your Big Red Gifts Match',
		text: `Happy Holidays from Big Red Gifts!

You're matched with ${row.first_name} ${row.last_name} (${row.netId})! \
${row.first_name} is a ${row.year} with gift preferences ${row.gift1}, ${row.gift2}, and ${row.gift3}. \
${row.bio ? 'Their bio is:\n':''}${row.bio}

As a reminder, you and ${row.first_name} both selected to give gifts in the ${row.price_range} range. \
Your exchange method is ${row.ex_type}. \
${row.ex_type == 'in person' ? `We will host an event at Willard Straight on \
Dec 2 from 6:30 - 8:00 pm to facilitate exchange. This is completely optional and you may coordinate with \
your match by email (${row.netId}) as to whether you would exchange at the event or elsewhere of your choosing.\
` : 'We will send out addresses in a later email.'}
Please be ready with a gift to exchange by Dec 5 at the latest.

Happy Gifting!
Big Red Gifts Team`
	};
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log(`Email sent: ${info.response} \t\t-- ${row.match_id} received info about ${row.netId}`);
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

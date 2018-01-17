# 🎁 Big Red Gifts - Logistics Subteam
Logistic related tools for https://bigred.gifts, a campus-wide gift exchange organized by Creative Computing Club at Cornell University. Subteam worked on project from Oct. 2017 - Dec. 2017; Commit history has been kept in private repo to avoid sharing various student data.
### Subteam Members
* Valeriya Rusina '20  
* Wilona Shen '20  
* Chris Umeki '19  
* Mena Wang '20
### Dependencies
Before installing, have [Node.js](https://nodejs.org/en/download/).

Install dependencies with
```bash
$ npm install
```
### Run

Generate a specific student's mailing label as webcontent
```bash
$ npm run-script label
```
Send an email to each student in database. Assigns each student their match and gives relevant information about their match.
```bash
$ npm run-script matchemail
```
Send a mass email to all students who selected in person exchange rather than mail exchange
```bash
$ npm run-script eventreminder
```

Database information stored in SQLite with following schema.

```sqlite
CREATE TABLE info(id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT, last_name TEXT, year INT, netId TEXT, gender TEXT, bio TEXT,
    gift1 TEXT, gift2 TEXT, gift3 TEXT,
    price_range TEXT,
    ex_type TEXT, address TEXT, off_campus INT, match_id TEXT);
```

![Big Red Gifts Logo](https://bigred.gifts/images/logo.png)

var sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE surveys (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title text UNIQUE, 
            que text, 
            CONSTRAINT title_unique UNIQUE (title)
            )`,
        (err) => {});
        db.run(`CREATE TABLE results (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title text,
            que text, 
            ans text 
            )`,
        (err) => {});  
    }
});


module.exports = db
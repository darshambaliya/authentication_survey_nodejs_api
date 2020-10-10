const config = require('config.json');
const jwt = require('jsonwebtoken');
const db = require('./database')

// users hardcoded for simplicity, store in a db for production applications
const users = [{ id: 1, username: 'test', password: 'test', firstName: 'Test', lastName: 'User' }];

module.exports = {
    authenticate,
    getAll,
    createSurvey,
    takeSurvey,
    getResults
};

async function authenticate({ username, password }) {
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) throw 'Username or password is incorrect';

    // create a jwt token that is valid for 7 days
    const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '7d' });

    return {
        ...omitPassword(user),
        token
    };
}

async function getAll() {
    return users.map(u => omitPassword(u));
}

async function createSurvey({title, questions}) {
    var sql ='INSERT INTO surveys (title, que) VALUES (?,?)'
    var params =[title, questions]
    db.run(sql, params, function (err, result) {
        if (err){
            return "Survey was not created";
        }
    });
    return "Survey Created Successfully";
}

async function takeSurvey({title}, {answers}) {
    var sql = "select * from surveys where title = ?"
    var params = [title]
    db.get(sql, params, (err, row) => {
        if (err) {
          return "Survey with this title does not exists.";
        }
        sql ='INSERT INTO results (title, que, ans) VALUES (?,?,?)'
        params =[title, row["que"], answers]
        db.run(sql, params, function (err, result) {
            if (err){
                return "Answers were not submitted";
            }
        });
    });
    return "Answers Submitted Successfully";
}

async function getResults() {
    return new Promise(function(resolve, reject){
        var sql = "select * from results"
        db.all(sql, [], function (err, result) {
            if (err){
                resolve("No Results Exists.");
            }
            resolve(result);
        });
    })
      
}
// helper functions

function omitPassword(user) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
}
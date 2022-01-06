const {pool} = require("../services/DBService");

const getAllQuestions = (callback) => {
    pool.getConnection().then((con) => {
        con.query('SELECT * from questions').then((rows) => {
            callback(rows)
        }).then(async () => {
            await con.end();
        })
    }).catch(err => {
        console.log(err);
    })
}

module.exports = {getAllQuestions};
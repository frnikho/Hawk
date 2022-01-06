const {pool} = require("../services/DBService");

const getAllQuestions = (callback) => {
    pool.getConnection().then((con) => {
        con.query('SELECT * from questions').then((rows) => {
            callback(rows)
        })
    })
}

module.exports = {getAllQuestions};
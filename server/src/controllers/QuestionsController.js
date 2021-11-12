const db = require('../services/DBService');

const getQuestionByUuid = (uuid, callback) => {
    db.getConnection().then((con) => {
       con.query(`SELECT * FROM questions WHERE uuid='${uuid}'`).then((rows) => {
           callback(rows)
       })
    }).then((con) => {

    });
}

const getQuestionsByDifficulty = (difficulty, callback) => {
    db.getConnection().then((con) => {
        con.query(`SELECT * FROM questions WHERE difficulty='${difficulty}'`).then((rows) => {
            callback(rows);
        });
    });
}

const getQuestionAnswerByUuid = (uuid, callback) => {
    db.getConnection().then((con) => {
        con.query(`SELECT answers, answer FROM questions`).then((rows) => {
           callback(rows);
        });
    });
}

const getRandomQuestion = (callback) => {
    db.getConnection().then((con) => {
        con.query('SELECT * from questions order by rand() limit 1').then((rows) => {
            callback(rows)
        })
    })
}

module.exports = {getQuestionByUuid, getQuestionsByDifficulty, getQuestionAnswerByUuid}
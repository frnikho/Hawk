const {pool} = require("../services/DBService");

export const getAllQuestions = (callback) => {
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

export const getRandomQuestions = (limit, callback) => {
    pool.getConnection().then(con => {
        con.query(`SELECT * FROM questions ORDER BY RAND() LIMIT ${limit};`).then(rows => {
            callback(rows);
        }).then(async () => {
            await con.end();
        })
    }).catch(err => console.log(err));
}
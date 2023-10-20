
const connection = require("../dbConfig")

const movieCtrl = {
    getMovies : async (req,res) => {
        connection.query('SELECT * FROM memories.user', (error, rows) => {
            if(error) throw error;
            console.log(rows);
            res.send(rows);
        })
    },
    insertMovie : async (req,res) => {
        const {USER_ID, USER_EMAIL, USER_PW, USER_NAME, USER_NICKNAME, USER_PHONE, USER_INTRO} = req.body;
        const sql = `INSERT INTO user(USER_ID, USER_EMAIL, USER_PW, USER_NAME, USER_NICKNAME, USER_PHONE, USER_INTRO) 
        VALUES('${USER_ID}', '${USER_EMAIL}', '${USER_PW}', '${USER_NAME}', '${USER_NICKNAME}', '${USER_PHONE}', '${USER_INTRO}');`

        connection.query(
            sql, (error, rows) => {
                if(error) throw error;
                res.send(rows);
            }
        )
    }
}

module.exports = movieCtrl;
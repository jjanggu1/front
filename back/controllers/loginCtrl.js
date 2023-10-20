const connection = require("../dbConfig");

const loginCtrl = {
    checkLoginData: async (req, res) => {
        connection.query('SELECT * FROM memories.user', (error, rows) => {
            if (error) throw error;
            console.log(rows); // 데이터 콘솔로 찍기
            res.send(rows);
        })
    },
   
}

module.exports = loginCtrl;
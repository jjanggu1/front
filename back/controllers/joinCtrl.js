const connectToDatabase = require("../dbConfig");
const bcrypt = require("bcrypt");

const joinCtrl = {
    insertUserData: async (req, res) => {
        try {
            const { id, password, passwordCheck, email, name, nick, phone } = req.body;
            const bcryptPassword = await bcrypt.hash(password, 12);

            const connection = await connectToDatabase();

            const [results] = await connection.query(`
            INSERT INTO user (USER_ID, USER_EMAIL, USER_PW, USER_NAME, USER_NICKNAME, USER_PHONE) VALUES (?, ?, ?, ?, ?, ?)
            `, [id, email, bcryptPassword, name, nick, phone]);

            console.log('회원가입이 성공적으로 완료되었습니다.');
            res.json({ success: true, message: '회원가입에 성공하였습니다.' });

            connection.end(); // 연결 종료
        } catch (error) {
            console.error('예외 발생:', error);
            res.json({ success: false, message: '서버 오류' });
        }
    }
}

module.exports = joinCtrl;
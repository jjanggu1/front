const connectToDatabase = require("../dbConfig");
const bcrypt = require("bcrypt");

const updateProfileCtrl = {
    // 회원 프로필 수정
    updateUserData: async (req, res) => {
        try {
            const { name, username, email, phonenum, intro, userId } = req.body;

            const connection = await connectToDatabase();

            const [results] = await connection.query(`
            UPDATE user
            SET USER_NAME = ?, USER_NICKNAME = ?, USER_EMAIL = ?, USER_PHONE = ?, USER_INTRO = ?
            WHERE USER_ID = ?;
            `, [ name, username, email, phonenum, intro, userId]);

            console.log('프로필이 성공적으로 수정되었습니다.', results);
            res.json({ success: true, message: '프로필이 수정되었습니다.' });

            connection.end(); // 연결 종료
        } catch (error) {
            console.error('예외 발생:', error);
            res.status(500).json({ success: false, message: '서버 오류' });
        }
    },
    // 회원 비밀번호 수정
    updatePassword: async (req, res) => {
        try {
            let userPassword = req.body.userPassword;
            const userId = req.body.userId;
            const bcryptPassword = await bcrypt.hash(userPassword, 12);

            const connection = await connectToDatabase();

            const [results] = await connection.query(`
            UPDATE user
            SET USER_PW = ?
            WHERE USER_ID = ?;
            `, [ bcryptPassword, userId]);

            console.log('비밀번호가 성공적으로 수정되었습니다.', results);
            res.json({ success: true, message: '비밀번호가 수정되었습니다.' });

            connection.end(); // 연결 종료
        } catch (error) {
            console.error('예외 발생:', error);
            res.status(500).json({ success: false, message: '서버 오류' });
        }
    }
}

module.exports = updateProfileCtrl;
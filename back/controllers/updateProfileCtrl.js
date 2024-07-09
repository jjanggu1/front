const connectToDatabase = require("../dbConfig");
const bcrypt = require("bcrypt");

const updateProfileCtrl = {
    // 회원 프로필 수정
    updateUserData: async (req, res) => {
        try {
            const { name, username, email, phonenum, intro, userId } = req.body;

            const connection = await connectToDatabase();

            let updateFields = [];
            let updateValues = [];

            if (name !== '' && name !== null) {
                updateFields.push('USER_NAME = ?');
                updateValues.push(name);
            }
            if (username !== '' && username !== null) {
                updateFields.push('USER_NICKNAME = ?');
                updateValues.push(username);
            }
            if (email !== '' && email !== null) {
                updateFields.push('USER_EMAIL = ?');
                updateValues.push(email);
            }
            if (phonenum !== '' && phonenum !== null) {
                updateFields.push('USER_PHONE = ?');
                updateValues.push(phonenum);
            }
            if (intro !== '' && intro !== null) {
                updateFields.push('USER_INTRO = ?');
                updateValues.push(intro);
            }

            updateValues.push(userId);

            const query = `
        UPDATE user
        SET ${updateFields.join(', ')}
        WHERE USER_ID = ?;
        `;

            const [results] = await connection.query(query, updateValues);

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
            const userId = req.body.userId;
            let userPassword = req.body.userPassword;

            const bcryptPassword = await bcrypt.hash(userPassword, 12);

            const connection = await connectToDatabase();

            const [results] = await connection.query(`
            UPDATE user
            SET USER_PW = ?
            WHERE USER_ID = ?;
            `, [bcryptPassword, userId]);

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
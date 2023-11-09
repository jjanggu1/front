const connectToDatabase = require("../dbConfig");
const bcrypt = require('bcrypt');

const loginCtrl = {
    // 로그인 로직
    checkLogin: async (req, res) => {
        try {
            const userId = req.body.userId;
            const password = req.body.password;

            const connection = await connectToDatabase(); //DB연결

            // DB에서 가져온 데이터
            const [rows, fields] = await connection.execute('SELECT * FROM user WHERE USER_ID = ?', [userId]);

            if (rows.length === 0) {
                console.log("아이디가 존재하지 않습니다.");
                return res.status(401).send("존재하지 않는 사용자입니다.")
            }

            const hashedPassword = rows[0].USER_PW;
            const passwordMatch = await bcrypt.compare(password, hashedPassword);

            if (!passwordMatch) {
                console.log("비밀번호가 일치하지 않습니다.");
                return res.status(401).json({
                    success: false,
                    message: "존재하지 않는 사용자입니다."
                });
            }
            let userData = { //로그인 성공시 프론드단에 보낼 데이터
                userId: rows[0].USER_ID,
                userEmail: rows[0].USER_EMAIL,
                userName: rows[0].USER_NAME,
                userNickname: rows[0].USER_NICKNAME,
                userPhone: rows[0].USER_PHONE,
                userIntro: rows[0].USER_INTRO,
                userImage: rows[0].USER_IMAGE,
            }; 
            console.log("로그인 성공");
            return res.status(200).json({userData});
        } catch (error) {
            console.error('로그인 오류: ' + error.message);
            return res.status(500).json({
                success: false,
                message: "로그인 오류"
            });
        }
    },

}

module.exports = loginCtrl;
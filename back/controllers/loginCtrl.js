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
            const results = await connection.execute('SELECT * FROM user WHERE USER_ID = ?', [userId]);
            const hashedPassword = results[0][0].USER_PW;
            console.log(results[0][0]);

            const idMatch = results.length === 0 ? false : true;
            const passwordMatch = await bcrypt.compare(password, hashedPassword);

            let userData = {
                userId: results[0][0].USER_ID,
                userEmail: results[0][0].USER_EMAIL,
                userName: results[0][0].USER_NAME,
                userNickname: results[0][0].USER_NICKNAME,
                userPhone: results[0][0].USER_PHONE,
                userIntro: results[0][0].USER_INTRO,
                userImage: results[0][0].USER_IMAGE,
            }; //로그인 성공시 프론드단에 보낼 데이터

            if(idMatch) { //아이디 존재하면
                if (!passwordMatch) { //아이디 존재, 비밀번호 불일치면
                    console.log("비밀번호 불일치");
                    res.send({
                        success: false,
                        message: "비밀번호 불일치"
                    });
                } else if (idMatch && passwordMatch) { //아이디존재, 비번 일치하면
                    console.log("로그인 성공");
                    res.send({
                        success: true,
                        message: "로그인 성공",
                        userData
                    });
                }
            }
            connection.end(); // DB연결 종료
        } catch (error) {
            console.error('로그인 오류 : ' + error.message);
            res.send({
                success: false,
                message: "존재하지 않는 아이디"
            })
        }
    },

}

module.exports = loginCtrl;
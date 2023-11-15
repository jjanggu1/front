const express = require('express');
const router = express.Router();
const upload = require('../multerConfig'); // Multer 구성 불러오기
const path = require('path');
const connectToDatabase = require("../dbConfig");


// 프로필 이미지 업로드 라우트
router.post('/', upload.single('profileImage'), async (req, res) => {
    try {
        // req.file이 정의되어 있지 않다면 오류 응답
        if (!req.file) {
            return res.status(400).json({ error: '파일이 올바르게 업로드되지 않았습니다.' });
        }

        // 업로드 성공 시 클라이언트에 이미지 경로 응답
        const imagePath = path.join(__dirname, '..', req.file.filename);

        // DB에 저장
        const userId = req.body.userId; // 사용자 ID를 가져오는 부분
        const connection = await connectToDatabase(); // DB에 연결
        const updateQuery = `UPDATE user SET USER_IMAGE = ? WHERE USER_ID = ?`;

        // 이미지 경로에서 파일의 기본 이름만 추출하여 저장
        const fileName = path.basename(imagePath);

        await connection.query(updateQuery, [fileName, userId]);

        res.json({ imagePath });
    } catch (error) {
        console.error('프로필 이미지 업로드 및 DB 저장 오류: ', error);
        res.status(500).send('Internal Server Error');
    }
});

//프로필 이미지 프론트로 응답
router.post('/getProfileImage', async (req, res) => {
    try {
        const userId = req.body.userId;
        const connection = await connectToDatabase();
        const selectQuery = `SELECT USER_IMAGE FROM user WHERE USER_ID = ?`;
        const result = await connection.query(selectQuery, [userId]);
        console.log("쿼리 결과값 : ", result);
        console.log("게시글 이미지 요청 아이디 : ", userId);
        if (result.length > 0 && result[0][0].USER_IMAGE) {
            const imagePathFromDB = result[0][0].USER_IMAGE;
            const imagePath = path.join(__dirname, '..', 'uploads', 'profile', imagePathFromDB);
            res.sendFile(imagePath);
        } else {
            res.status(404).json({ error: '이미지를 찾을 수 없습니다.' });
        }
    } catch (error) {
        console.error('이미지 경로 응답 오류: ', error);
        res.status(500).send('Internal Server Error');
    }
});


module.exports = router;

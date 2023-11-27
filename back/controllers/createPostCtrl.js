const connectToDatabase = require("../dbConfig");
const express = require('express');
const upload = require('../multerConfig'); // Multer 구성 불러오기
const path = require('path');

const createPostCtrl = {
    // 게시글 작성 데이터 DB에 저장
    createPost: async (req, res) => {
        try {
            // let createPostData = [
            //     req.body.userId,
            //     req.body.userNick,
            //     req.body.content,
            //     req.body.hashtag,
            //     req.body.isCommentPossible
            // ]
            console.log(req.body)
            const connection = await connectToDatabase();

            // 글 내용 업로드
            const [results] = await connection.execute(`
            INSERT INTO board 
            (BRD_WRITER, BRD_NICK, BRD_CON, BRD_HASHTAG, BRD_COMMENT_OPEN) VALUES (?, ?, ?, ?, ?)`,
                createPostData);

            // 글 이미지 업로드
            upload.array('postImage', 5)(req, res, async (err) => {
                if (err) {
                    // 업로드 에러 처리
                    return res.status(500).json({ error: '파일이 올바르게 업로드되지 않았습니다.' });
                }

                // 업로드 성공 시 req.file에서 파일 정보를 사용할 수 있음
                console.log(req.files);

                // DB에 저장
                const userId = req.body.userId; // 사용자 ID를 가져오는 부분
                const updateQuery = `
                  UPDATE board 
                  SET BRD_IMAGE1 = ?, BRD_IMAGE2 = ?, BRD_IMAGE3 = ?, BRD_IMAGE4 = ?, BRD_IMAGE5 = ?
                  WHERE USER_ID = ?`;

                // 이미지 경로에서 파일의 기본 이름만 추출하여 저장
                const fileNames = req.files.map(file => path.basename(file.path));

                await connection.query(updateQuery, [...fileNames, userId]);

                res.json({ imagePaths: fileNames });
            });

            res.status(201).json({ message: "게시글 작성완료" });

            connection.end(); // 연결 종료
        } catch (error) {
            console.error("게시글 작성 오류: " + error.message);
            res.status(500).json({ error: "서버 오류" });
        }
    },

}

module.exports = createPostCtrl;
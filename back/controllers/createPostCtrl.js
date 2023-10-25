const connectToDatabase = require("../dbConfig");

const createPostCtrl = {
    // 게시글 작성 데이터 DB에 저장
    createPost: async (req, res) => {
        let createPostData = [
            req.body.userId,
            req.body.userNickName,
            req.body.imageAddr1,
            req.body.imageAddr2,
            req.body.imageAddr3,
            req.body.imageAddr4,
            req.body.imageAddr5,
            req.body.postCon,
            req.body.postHashTag,
            req.body.commentOpen
    ]
        try {
            const connection = await connectToDatabase();
            const [results] = await connection.execute(`
            INSERT INTO board 
            (BRD_WRITER, BRD_NICK, BRD_IMAGE1, BRD_IMAGE2, BRD_IMAGE3, BRD_IMAGE4, BRD_IMAGE5, BRD_CON, BRD_HASHTAG, BRD_COMMENT_OPEN) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                createPostData);

            res.status(201).json({ message: "게시글 작성완료" });

            connection.end(); // 연결 종료
        } catch (error) {
            console.error("게시글 작성 오류: " + error.message);
            res.status(500).json({ error: "서버 오류" });
        }
    },

}

module.exports = createPostCtrl;
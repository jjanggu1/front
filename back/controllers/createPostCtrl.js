const connectToDatabase = require("../dbConfig");
const multerConfig = require("../multerConfig");

const createPostCtrl = {
    // 게시글 작성 데이터 DB에 저장
    createPost: async (req, res) => {
        try {
            let ImgData = [];
            ImgData = req.files.map(file => file.filename);
            console.log(req.files);
            const imgDataLength = ImgData.length;
            const imgValues = Array.from({ length: 5 }, (_, index) => index < imgDataLength ? ImgData[index] : null);

            let createPostData = [
                req.body.userId,
                req.body.userNick,
                req.body.content,
                req.body.hashtag,
                req.body.isCommentPossible === 'true' ? 0 : 1
            ]
            const connection = await connectToDatabase();

            // 글 내용 업로드
            const [conResults] = await connection.execute(`
                INSERT INTO board 
                (BRD_WRITER, BRD_NICK, BRD_CON, BRD_HASHTAG, BRD_COMMENT_OPEN) VALUES (?, ?, ?, ?, ?)`,
                createPostData);

            const brdId = conResults.insertId;
            // 동적으로 destination 설정
            multerConfig.setDynamicDestination(`uploads/post/${brdId + 1}/`);

            const [imgResults] = await connection.execute(`
                UPDATE board 
                SET BRD_IMAGE1 = ?, BRD_IMAGE2 = ?, BRD_IMAGE3 = ?, BRD_IMAGE4 = ?, BRD_IMAGE5 = ?
                WHERE BRD_ID = ?`,
                [...imgValues, brdId]);


            res.status(201).json({ success: true, message: "게시글 작성완료" });

            connection.end(); // 연결 종료
        } catch (error) {
            console.error("게시글 작성 오류: " + error.message);
            res.status(500).json({ error: "서버 오류" });
        }
    },

}

module.exports = createPostCtrl;
const connectToDatabase = require("../dbConfig");

const mainCtrl = {
    //메인페이지 게시글 목록(최신순) 데이터
    getMainPostData: async (req, res) => {
        try {
            const connection = await connectToDatabase();
            
            const [rows] = await connection.query(`
            SELECT board.*, user.USER_ID, user.USER_NICKNAME, user.USER_IMAGE, COUNT(likedpost.LIKED_NUM) AS LIKED_COUNT
            FROM board
            INNER JOIN user ON board.BRD_WRITER = user.USER_ID
            LEFT JOIN likedpost ON board.BRD_ID = likedpost.LIKED_NUM
            GROUP BY board.BRD_ID, user.USER_NICKNAME, user.USER_IMAGE
            ORDER BY board.BRD_CREATED_AT DESC
            `);
            res.send(rows);
            console.log(rows);
            connection.end(); // 연결 종료
        } catch (error) {
            console.error("게시물 목록 조회 실패", error);
        }
    },
    // 해당글의 댓글(최신순) 데이터
    getMainPostComment: async (req, res) => {
        try {
            const brdId = req.body.brdId;

            const connection = await connectToDatabase();

            const [rows] = await connection.query(`
            SELECT comment.COM_NUM, comment.COM_WRITER, comment.COM_IMAGE, comment.COM_CREATED_AT, comment.COM_COMMENT, comment.COM_REPORT, user.USER_NICKNAME, user.USER_IMAGE
            FROM comment
            INNER JOIN user ON comment.COM_WRITER = user.USER_ID
            WHERE comment.COM_NUM = 1
            ORDER BY comment.COM_CREATED_AT DESC
            `, [brdId]);
            res.send(rows);

            connection.end(); // 연결 종료
        } catch (error) {
            console.error("해당글의 댓글 조회 실패", error);
        }
    },
    // 로그인되어 있는 현재회원의 이미지
    getMainUserImg: async (req, res) => {
        try {
            const userId = req.body.userId;

            const connection = await connectToDatabase();

            const [rows] = await connection.query(`
            SELECT *
            FROM user
            WHERE USER_ID = ?
            `, [userId]);
            res.send(rows);

            connection.end(); // 연결 종료
        } catch (error) {
            console.error("회원 이미지 조회 실패", error);
        }
    },
    // 로그인되어 있는 회원이 좋아요,저장한 글 데이터
    getMainLikedSaved: async (req, res) => {
        try {
            const userId = req.body.userId;

            const connection = await connectToDatabase();

            const [rows] = await connection.query(`
            SELECT likedpost.*, savedpost.*
            FROM likedpost
            JOIN savedpost ON likedpost.LIKED_ID = savedpost.SAVED_ID
            WHERE likedpost.LIKED_ID = ?;
            `, [userId]);
            res.send(rows);

            connection.end(); // 연결 종료
        } catch (error) {
            console.error("회원의 좋아요,저장한 글 조회 실패", error);
        }
    },
    // 해당 글의 댓글 작성
    //COM_NUM, COM_WRITER, COM_NICK, COM_COMMENT
    insertMainComment: async (req, res) => {
        try {
            const { COM_NUM, COM_WRITER, COM_NICK, COM_COMMENT } = req.body;

            const connection = await connectToDatabase();

            const [results] = await connection.query(`
            INSERT INTO comment (COM_NUM, COM_WRITER, COM_NICK, COM_COMMENT) VALUES (?, ?, ?, ?)
            `, [COM_NUM, COM_WRITER, COM_NICK, COM_COMMENT]);

            console.log('댓글이 성공적으로 추가되었습니다.');
            res.json({ success: true, message: '댓글이 추가되었습니다.' });

            connection.end(); // 연결 종료
        } catch (error) {
            console.error('예외 발생:', error);
            res.status(500).json({ success: false, message: '서버 오류' });
        }
    }
}

module.exports = mainCtrl;
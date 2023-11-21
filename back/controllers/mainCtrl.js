const connectToDatabase = require("../dbConfig");
const path = require('path');

const mainCtrl = {
    //메인페이지 게시글 목록(최신순) 데이터
    getMainPostData: async (req, res) => {
        try {
            const connection = await connectToDatabase();

            const [rows] = await connection.query(`
            SELECT board.BRD_ID, board.BRD_WRITER, board.BRD_NICK, board.BRD_IMAGE1, board.BRD_IMAGE2, board.BRD_IMAGE3, board.BRD_IMAGE4, board.BRD_IMAGE5, board.BRD_CON, board.BRD_HASHTAG, board.BRD_COMMENT_OPEN, board.BRD_REPORT, DATE_FORMAT(board.BRD_CREATED_AT, '%Y.%m.%d %r') AS BRD_CREATED_AT, user.USER_ID, user.USER_NICKNAME, user.USER_IMAGE, COUNT(likedpost.LIKED_NUM) AS LIKED_COUNT
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
            SELECT comment.COM_ID, comment.COM_NUM, comment.COM_WRITER, comment.COM_IMAGE, DATE_FORMAT(comment.COM_CREATED_AT, '%Y.%m.%d %r') AS COM_CREATED_AT, comment.COM_COMMENT, comment.COM_REPORT, user.USER_NICKNAME, user.USER_IMAGE
            FROM comment
            INNER JOIN user ON comment.COM_WRITER = user.USER_ID
            WHERE comment.COM_NUM = ?
            ORDER BY comment.COM_CREATED_AT DESC
            `, [brdId]);
            res.send(rows);

            connection.end(); // 연결 종료
        } catch (error) {
            console.error("해당글의 댓글 조회 실패", error);
        }
    },

    // 해당 글의 댓글 추가
    insertMainComment: async (req, res) => {
        try {
            const { brdId, userId, userNick, comment } = req.body;

            const connection = await connectToDatabase();

            const [results] = await connection.query(`
            INSERT INTO comment (COM_NUM, COM_WRITER, COM_NICK, COM_COMMENT) VALUES (?, ?, ?, ?)
            `, [brdId, userId, userNick, comment]);

            console.log('댓글이 성공적으로 추가되었습니다.', results);

            res.json({ success: true, message: '댓글이 추가되었습니다.' });

            connection.end(); // 연결 종료
        } catch (error) {
            console.error('예외 발생:', error);
            res.status(500).json({ success: false, message: '서버 오류' });
        }
    },

    // 해당 글의 댓글 삭제
    removeMainComment: async (req, res) => {
        try {
            const { comId, userId } = req.body;

            const connection = await connectToDatabase();

            const [results] = await connection.query(`
            DELETE FROM comment WHERE COM_ID = ? AND COM_WRITER = ?
            `, [comId, userId]);

            console.log('댓글이 성공적으로 삭제되었습니다.', results);

            res.json({ success: true, message: '댓글이 삭제되었습니다.' });

            connection.end(); // 연결 종료
        } catch (error) {
            console.error('예외 발생:', error);
            res.status(500).json({ success: false, message: '서버 오류' });
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
            LEFT JOIN savedpost ON likedpost.LIKED_ID = savedpost.SAVED_ID
            WHERE likedpost.LIKED_ID = ?
            UNION
            SELECT likedpost.*, savedpost.*
            FROM likedpost
            RIGHT JOIN savedpost ON likedpost.LIKED_ID = savedpost.SAVED_ID
            WHERE savedpost.SAVED_ID = ?
            `, [userId, userId]);
            res.send(rows);
            console.log("좋아요저장됨 요청값 : ", rows)

            connection.end(); // 연결 종료
        } catch (error) {
            console.error("회원의 좋아요,저장한 글 조회 실패", error);
        }
    },

    // 로그인되어 있는 회원의 좋아요 추가
    addLike: async (req, res) => {
        try {
            const userId = req.body.userId;
            const brdId = req.body.brdId;

            const connection = await connectToDatabase();

            const [rows] = await connection.query(`
            INSERT INTO likedpost (LIKED_NUM, LIKED_ID) VALUES (?, ?)
            `, [brdId, userId]);
            res.json({ success: true, message: '좋아요 추가에 성공하였습니다.' });

            connection.end(); // 연결 종료
        } catch (error) {
            console.error("좋아요 추가에 실패하였습니다.", error);
        }
    },

    // 로그인되어 있는 회원의 좋아요 삭제
    removeLike: async (req, res) => {
        try {
            const userId = req.body.userId;
            const brdId = req.body.brdId;

            const connection = await connectToDatabase();

            const [rows] = await connection.query(`
            DELETE FROM likedpost
            WHERE LIKED_NUM = ? AND LIKED_ID = ?
            `, [brdId, userId]);
            res.json({ success: true, message: '좋아요 삭제에 성공하였습니다.' });

            connection.end(); // 연결 종료
        } catch (error) {
            console.error("좋아요 삭제에 실패하였습니다.", error);
        }
    },

    // 로그인되어 있는 회원의 저장글 추가
    addSave: async (req, res) => {
        try {
            const userId = req.body.userId;
            const brdId = req.body.brdId;

            const connection = await connectToDatabase();

            const [rows] = await connection.query(`
            INSERT INTO savedpost (SAVED_NUM, SAVED_ID) VALUES (?, ?)
            `, [brdId, userId]);
            res.json({ success: true, message: '저장글 추가에 성공하였습니다.' });

            connection.end(); // 연결 종료
        } catch (error) {
            console.error("저장글 추가에 실패하였습니다.", error);
        }
    },

    // 로그인되어 있는 회원의 저장글 삭제
    removeSave: async (req, res) => {
        try {
            const userId = req.body.userId;
            const brdId = req.body.brdId;

            const connection = await connectToDatabase();

            const [rows] = await connection.query(`
            DELETE FROM savedpost
            WHERE SAVED_NUM = ? AND SAVED_ID = ?
            `, [brdId, userId]);
            res.json({ success: true, message: '저장글 삭제에 성공하였습니다.' });

            connection.end(); // 연결 종료
        } catch (error) {
            console.error("저장글 삭제에 실패하였습니다.", error);
        }
    },


}



module.exports = mainCtrl;
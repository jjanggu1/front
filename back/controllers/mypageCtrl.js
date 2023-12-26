const connectToDatabase = require("../dbConfig");

const myPageCtrl = {
    // 회원 데이터 조회
    getUserData: async (req, res) => {
        try {
            const userId = req.body.userId;
            const connection = await connectToDatabase();
            const [rows, fields] = await connection.query(`
            SELECT USER_ID, USER_NAME, USER_NICKNAME, USER_INTRO, USER_IMAGE
            FROM user WHERE USER_ID = ?
            `, [userId]);
            console.log('Query results:', rows);
            res.send(rows);
            connection.end(); // 연결 종료
        } catch (error) {
            console.error('Error fetching data: ' + error.message);
        }
    },
    // 회원이 작성한 게시글 수 데이터 조회
    getUserPostCountData: async (req, res) => {
        try {
            const userId = req.body.userId;
            const connection = await connectToDatabase();
            const [rows, fields] = await connection.query(`
            SELECT COUNT(*) AS totalPostCount
            FROM board
            WHERE BRD_WRITER = ?
            `, [userId]);
            console.log('Query results:', rows);
            res.send(rows);
            connection.end(); // 연결 종료
        } catch (error) {
            console.error('Error fetching data: ' + error.message);
        }
    },
    // 회원이 작성한 게시물 조회
    getUserPosts: async (req, res) => {
        try {
            const userId = req.body.userId;
            console.log(req.body);
            const connection = await connectToDatabase();
            const [rows, fields] = await connection.execute('SELECT * FROM board WHERE BRD_WRITER = ?', [userId]);
            console.log('Query results:', rows);
            res.send(rows);
            connection.end(); // 연결 종료
        } catch (error) {
            console.error('Error fetching data: ' + error.message);
        }
    },
    // 회원이 저장한 게시물 조회
    getSavedData: async (req, res) => {
        try {
            const userId = req.body.userId;
            const connection = await connectToDatabase();
            const [rows, fields] = await connection.query(`
            SELECT board.*
            FROM board
            INNER JOIN savedpost ON board.BRD_ID = savedpost.SAVED_NUM
            WHERE savedpost.SAVED_ID = ?`
            , [userId]);
            console.log('Query results:', rows);
            res.send(rows);
            connection.end(); // 연결 종료
        } catch (error) {
            console.error('Error fetching data: ' + error.message);
        }
    },
    // 회원이 좋아요한 게시물 조회
    getLikedData: async (req, res) => {
        try {
            const userId = req.body.userId;
            const connection = await connectToDatabase();
            const [rows, fields] = await connection.query(`
            SELECT board.*
            FROM board
            INNER JOIN likedpost ON board.BRD_ID = likedpost.LIKED_NUM
            WHERE likedpost.LIKED_ID = ?`
            , [userId]);
            console.log('Query results:', rows);
            res.send(rows);
            connection.end(); // 연결 종료
        } catch (error) {
            console.error('Error fetching data: ' + error.message);
        }
    },
}

module.exports = myPageCtrl;
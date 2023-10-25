const joinCtrl = require("../controllers/joinCtrl");
const router = require("express").Router();

// 메인페이지 - 게시글목록
router.route('/')
    .post(joinCtrl.insertUserData)


module.exports = router;